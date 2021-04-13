/**
 * 求以 a 为次幂，结果为 b 的基数， 如 x^a = b 求 x
 *
 * @param a 次数
 * @param b 结果，如果 b 小于 0
 * @returns {number} 结果
 */
export function calculateBase(a: number, b: number) {
  const e = Math.E;
  // fix lint: 用 ** 取代 Math.pow()
  return b >= 0 ? e ** (Math.log(b) / a) : e ** (Math.log(-b) / a) * -1;
}
