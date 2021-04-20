/**
 * 给予一个数组，计算 n 分位数
 *
 * @param arr
 * @param percentage
 * @returns {array} 四分位数
 */
export function quantileSorted(arr: number[], percentage: number) {
  const len = arr.length;
  if (!len) {
    return undefined;
  }

  if (len < 2) {
    return arr[len - 1];
  }

  const i = (len - 1) * percentage;
  const i0 = Math.floor(i);
  const v0 = arr[i0];
  const v1 = arr[i0 + 1];
  return v0 + (v1 - v0) * (i - i0);
}

export function createQuartile(arr: number[], n: number, isSorted: boolean = false) {
  const numberArr = arr;

  if (!isSorted) {
    numberArr.sort((a, b) => a - b);
  }

  const tmp = [];
  for (let i = 1; i < n; i += 1) {
    tmp.push(quantileSorted(numberArr, i / n));
  }
  return tmp;
}
