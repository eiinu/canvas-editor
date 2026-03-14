import { detectOS, OSType } from '@eiinu/editor-utils';

/**
 * 字体管理模块
 * 负责 OpenXML 字体到 Web 字体的映射以及跨平台回退逻辑
 */

export interface FontMapping {
  windows: string;
  macos: string;
  linux: string;
  generic: string;
}

export class FontManager {
  private static instance: FontManager;
  private currentOS: OSType;
  private measurementCache: Map<string, number> = new Map();
  private loadingFonts: Set<string> = new Set();

  /**
   * 预定义的字体映射表
   */
  private fontMappings: Record<string, FontMapping> = {
    'Microsoft YaHei': {
      windows: '"Microsoft YaHei", sans-serif',
      macos: '"PingFang SC", "Hiragino Sans GB", sans-serif',
      linux: '"Droid Sans Fallback", sans-serif',
      generic: 'sans-serif'
    },
    'SimSun': {
      windows: 'SimSun, "NSimSun", serif',
      macos: '"STSong", "Songti SC", serif',
      linux: '"AR PL UMing CN", serif',
      generic: 'serif'
    },
    'SimHei': {
      windows: 'SimHei, sans-serif',
      macos: '"STHeiti", "Heiti SC", sans-serif',
      linux: '"WenQuanYi Zen Hei", sans-serif',
      generic: 'sans-serif'
    },
    'KaiTi': {
      windows: 'KaiTi, "STKaiti", cursive',
      macos: '"STKaiti", "Kaiti SC", cursive',
      linux: '"AR PL UKai CN", cursive',
      generic: 'cursive'
    },
    'FangSong': {
      windows: 'FangSong, "STFangsong", serif',
      macos: '"STFangsong", "FangSong SC", serif',
      linux: 'serif',
      generic: 'serif'
    }
  };

  private constructor() {
    this.currentOS = detectOS();
  }

  public static getInstance(): FontManager {
    if (!FontManager.instance) {
      FontManager.instance = new FontManager();
    }
    return FontManager.instance;
  }

  /**
   * 获取映射后的字体族
   * @param fontName OpenXML 中的字体名称
   */
  public getFontFamily(fontName: string): string {
    // 1. 尝试从映射表中查找
    const mapping = this.fontMappings[fontName];
    if (mapping) {
      switch (this.currentOS) {
        case 'windows': return mapping.windows;
        case 'macos': return mapping.macos;
        case 'linux': return mapping.linux;
        default: return mapping.generic;
      }
    }

    // 2. 如果没有映射，直接返回原名并附加通用回退
    // 简单的启发式判断：如果是常见中文字体名但没在表里，可以附加通用黑体回退
    return `"${fontName}", sans-serif`;
  }

  /**
   * 注册自定义字体映射
   */
  public registerMapping(name: string, mapping: FontMapping) {
    this.fontMappings[name] = mapping;
  }

  /**
   * 检查并等待字体加载
   * @param fontFamily 映射后的 Web 字体名称
   */
  public async ensureFontLoaded(fontFamily: string): Promise<boolean> {
    if (typeof document === 'undefined' || !document.fonts) return true;

    // 如果已经在加载中，直接返回
    if (this.loadingFonts.has(fontFamily)) return false;

    try {
      const isLoaded = document.fonts.check(`12px ${fontFamily}`);
      if (!isLoaded) {
        this.loadingFonts.add(fontFamily);
        await document.fonts.load(`12px ${fontFamily}`);
        this.loadingFonts.delete(fontFamily);
        this.measurementCache.clear(); // 字体加载后，旧的宽度缓存失效
        return true; // 触发重新渲染
      }
    } catch (e) {
      console.warn(`Font load failed: ${fontFamily}`, e);
      this.loadingFonts.delete(fontFamily);
    }
    return false;
  }

  /**
   * 测量文本宽度 (带缓存)
   */
  public measureText(ctx: CanvasRenderingContext2D, text: string, font: string): number {
    const cacheKey = `${font}:${text}`;
    const cached = this.measurementCache.get(cacheKey);
    if (cached !== undefined) return cached;

    const width = ctx.measureText(text).width;
    this.measurementCache.set(cacheKey, width);
    return width;
  }

  /**
   * 清除测量缓存
   */
  public clearCache() {
    this.measurementCache.clear();
  }
}
