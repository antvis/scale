/**
 * 利用换底公式计算对数, 即 log(a)b
 *
 * @param a
 * @param b
 * @returns {number} 计算结果
 */
export function log(a: number, b: number) {
  return Math.log(b) / Math.log(a);
}
