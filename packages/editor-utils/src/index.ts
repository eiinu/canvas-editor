/**
 * 环境探测工具
 */

export type OSType = 'windows' | 'macos' | 'linux' | 'other';

/**
 * 检测当前操作系统
 */
export function detectOS(): OSType {
  if (typeof window === 'undefined') return 'other';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('win') !== -1) return 'windows';
  if (userAgent.indexOf('mac') !== -1) return 'macos';
  if (userAgent.indexOf('linux') !== -1) return 'linux';
  
  return 'other';
}

/**
 * 获取设备像素比 (DPR)
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
}

/**
 * Unicode 范围检测工具
 */
export const UnicodeRange = {
  /**
   * 获取字符的 Unicode 码点（正确处理代理对，如 emoji）
   */
  getCodePoint(char: string): number {
    return char.codePointAt(0) || char.charCodeAt(0);
  },

  /**
   * 是否为东亚字符 (CJK)
   */
  isEastAsian(char: string): boolean {
    const code = this.getCodePoint(char);
    return (
      (code >= 0x4e00 && code <= 0x9fff) || // CJK Unified Ideographs
      (code >= 0x3400 && code <= 0x4dbf) || // CJK Unified Ideographs Extension A
      (code >= 0x3000 && code <= 0x303f) || // CJK Symbols and Punctuation
      (code >= 0xff00 && code <= 0xffef)    // Halfwidth and Fullwidth Forms
    );
  },

  /**
   * 是否为 ASCII 字符
   */
  isASCII(char: string): boolean {
    return this.getCodePoint(char) <= 127;
  },

  /**
   * 是否为 High ANSI 字符
   */
  isHighANSI(char: string): boolean {
    const code = this.getCodePoint(char);
    return code > 127 && code <= 255;
  },

  /**
   * 是否为 Emoji 字符
   * 涵盖主要的 emoji Unicode 范围
   */
  isEmoji(char: string): boolean {
    const code = this.getCodePoint(char);
    return (
      // 基础表情符号（Emoticons）
      (code >= 0x1F600 && code <= 0x1F64F) ||
      // 杂项符号和象形文字
      (code >= 0x1F300 && code <= 0x1F5FF) ||
      // 交通和地图符号
      (code >= 0x1F680 && code <= 0x1F6FF) ||
      // 杂项符号
      (code >= 0x2600 && code <= 0x26FF) ||
      // Dingbats
      (code >= 0x2700 && code <= 0x27BF) ||
      // 各种符号和象形文字
      (code >= 0x1F900 && code <= 0x1F9FF) ||
      // 符号和象形文字扩展-A
      (code >= 0x1FA70 && code <= 0x1FAFF) ||
      // 棋类符号
      (code >= 0x1FA00 && code <= 0x1FA6F) ||
      // 表情符号补充
      (code >= 0x1F1E0 && code <= 0x1F1FF) ||
      // 方块形元素
      (code >= 0x1F100 && code <= 0x1F1FF) ||
      // 中性表情
      (code >= 0x1F000 && code <= 0x1F02F) ||
      // 补充箭头-A
      (code >= 0x27F0 && code <= 0x27FF) ||
      // 补充箭头-B
      (code >= 0x2900 && code <= 0x297F) ||
      // 补充数学运算符
      (code >= 0x2A00 && code <= 0x2AFF) ||
      // 补充符号
      (code >= 0x2B00 && code <= 0x2BFF)
    );
  }
};

/**
 * 常用函数工具
 */

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function(this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 生成唯一 ID
 */
export function generateId(prefix: string = ''): string {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}
