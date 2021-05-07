// 参考 d3-linear nice 的实现
// https://github.com/d3/d3-scale

import { tickIncrement } from './ticks';
import { NiceMethod } from '../types';

export const d3LinearNice: NiceMethod = (min: number, max: number, count: number = 5) => {
  let start = min < max ? min : max;
  let stop = min < max ? max : min;
  let step: number;
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
    start = Math.floor(start / step) * step;
    stop = Math.ceil(stop / step) * step;
  } else if (step < 0) {
    start = Math.ceil(start * step) / step;
    stop = Math.floor(stop * step) / step;
  }
  return [start, stop];
};
