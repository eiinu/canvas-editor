/**
 * 环境探测工具
 */
export type OSType = "windows" | "macos" | "linux" | "other";
/**
 * 检测当前操作系统
 */
export declare function detectOS(): OSType;
/**
 * 获取设备像素比 (DPR)
 */
export declare function getDevicePixelRatio(): number;
/**
 * Unicode 范围检测工具
 */
export declare const UnicodeRange: {
  /**
   * 获取字符的 Unicode 码点（正确处理代理对，如 emoji）
   */
  getCodePoint(char: string): number;
  /**
   * 是否为东亚字符 (CJK)
   */
  isEastAsian(char: string): boolean;
  /**
   * 是否为 ASCII 字符
   */
  isASCII(char: string): boolean;
  /**
   * 是否为 High ANSI 字符
   */
  isHighANSI(char: string): boolean;
  /**
   * 是否为 Emoji 字符
   * 涵盖主要的 emoji Unicode 范围
   */
  isEmoji(char: string): boolean;
  /**
   * 是否为 RTL (从右到左) 字符
   */
  isRTL(char: string): boolean;
};
/**
 * 语言方向检测工具
 */
export declare const TextDirection: {
  /**
   * 检测文本的主要方向
   * @param text 要检测的文本
   * @returns 'ltr' 或 'rtl'
   */
  detectDirection(text: string): "ltr" | "rtl";
  /**
   * 检查文本是否包含 RTL 字符
   * @param text 要检查的文本
   * @returns 是否包含 RTL 字符
   */
  containsRTL(text: string): boolean;
};
/**
 * 常用函数工具
 */
/**
 * 防抖函数
 */
export declare function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void;
/**
 * 节流函数
 */
export declare function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void;
/**
 * 生成唯一 ID
 */
export declare function generateId(prefix?: string): string;
