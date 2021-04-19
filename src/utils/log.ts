/**
 * 利用换底公式计算对数, 即 log(a)b
 *
 * @param a
 * @param b
 * @returns {number} 计算结果
 */
export function log(a: number, b: number) {
  return Math.log(b > 0 ? b : -b) / Math.log(a > 0 ? a : -a);
}
