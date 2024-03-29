// 为了解决 js 运算的精度问题
export function prettyNumber(n: number) {
  return Math.abs(n) < 1e-14 ? n : parseFloat(n.toFixed(14));
}
