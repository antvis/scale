function digitLength(num: number) {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 高精度加法，解决 0.1 + 0.2 !== 0.3 的经典问题
 *
 * @param num1 加数
 * @param num2 被加数
 * @return {number} 返回值
 */
export function precisionAdd(num1: number, num2: number) {
  const num1Digits = digitLength(num1);
  const num2Digits = digitLength(num2);
  const baseNum = 10 ** Math.max(num1Digits, num2Digits);
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
