/**
 * 构造区间 [a1, an) 的等差数列
 *
 * @param a1 起始值
 * @param an 结束值
 * @param d 公差
 * @returns {array[string]} 由每一项组成的数组
 */

export function sequence(a1: number, an: number, d: number) {
  const tmp = (an - a1) / d;
  const size = Number.isInteger(tmp) ? tmp : Math.floor(tmp) + 1;

  if (size <= 0) {
    return [];
  }

  const arr = new Array(size - 1);
  for (let i = 0; i < size; i += 1) {
    arr[i] = a1 + i * d;
  }
  return arr;
}
