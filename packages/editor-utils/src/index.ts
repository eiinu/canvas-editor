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
   * 是否为东亚字符 (CJK)
   */
  isEastAsian(char: string): boolean {
    const code = char.charCodeAt(0);
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
    return char.charCodeAt(0) <= 127;
  },

  /**
   * 是否为 High ANSI 字符
   */
  isHighANSI(char: string): boolean {
    const code = char.charCodeAt(0);
    return code > 127 && code <= 255;
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
