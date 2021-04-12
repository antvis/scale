/**
 * 构造区间 [a1, an) 的等差数列
 *
 * @param a1 起始值
 * @param an 结束值
 * @param d 公差
 * @returns {array[string]} 由每一项组成的数组
 */
export function sequence(a1: number, an: number, d: number) {
  const arr = [];
  for (let i = a1; i < an; i += d) {
    arr.push(i);
  }
  return arr;
}
