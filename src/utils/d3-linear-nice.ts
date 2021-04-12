// 参考 d3-linear nice 的实现
// https://github.com/d3/d3-scale

const e10 = Math.sqrt(50);
const e5 = Math.sqrt(10);
const e2 = Math.sqrt(2);

function tickIncrement(start: number, stop: number, count: number): number {
  const step = (stop - start) / Math.max(0, count);
  const power = Math.floor(Math.log(step) / Math.LN10);
  const error = step / 10 ** power;
  if (power >= 0) {
    // eslint-disable-next-line no-nested-ternary
    return (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * 10 ** power;
  }
  // eslint-disable-next-line no-nested-ternary
  return -(10 ** -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

export function d3LinearNice(domain: number[], count: number = 10) {
  const d = domain.slice();
  let i0 = 0;
  let i1 = domain.length - 1;
  let start = domain[i0];
  let stop = domain[i1];
  let step;

  if (stop < start) {
    [start, stop] = [stop, start];
    [i0, i1] = [i1, i0];
  }
  step = tickIncrement(start, stop, count);

  if (step > 0) {
    start = Math.floor(start / step) * step;
    stop = Math.ceil(stop / step) * step;
    step = tickIncrement(start, stop, count);
  } else if (step < 0) {
    start = Math.ceil(start * step) / step;
    stop = Math.floor(stop * step) / step;
    step = tickIncrement(start, stop, count);
  }

  if (step > 0) {
    d[i0] = Math.floor(start / step) * step;
    d[i1] = Math.ceil(stop / step) * step;
  } else if (step < 0) {
    d[i0] = Math.ceil(start * step) / step;
    d[i1] = Math.floor(stop * step) / step;
  }

  return d;
}
