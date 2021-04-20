/**
 * 给予一个
 *
 * @param arr
 * @param number
 * @param percentage
 * @returns {number}
 */
function getResult(arr: number[], number: number, percentage: number) {
  const round = Math.round(number);
  const floor = Math.floor(number);
  const delta = round - floor;

  if (delta <= 0) {
    return percentage * arr[floor] + (1 - percentage) * arr[floor + 1];
  }
  return percentage * arr[round] + percentage * arr[floor];
}

/**
 * 给予一个数组，计算 n 分位数
 *
 * @param arr
 * @param isSorted
 * @param division
 * @returns {array} 四分位数
 */
export function createQuartile(arr: number[], division: number, isSorted: boolean = false) {
  const numberArr = arr;

  if (!isSorted) {
    numberArr.sort((a, b) => a - b);
  }
  const size = numberArr.length;

  const q = [];

  for (let i = 1; i < division; i += 1) {
    const pos = (i * (size + 1)) / division - 1;
    q.push(Number.isInteger(pos) ? numberArr[pos] : getResult(numberArr, pos, 1 - i / division));
  }
  return q;
}
