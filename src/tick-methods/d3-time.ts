import { TickMethod } from '../types';
import { d3Ticks } from './d3-ticks';

// 暂时用 d3Ticks 代替
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const d3Time: TickMethod<Date> = (min, max, count, interval) => {
  return d3Ticks(+min, +max, count).map((d) => new Date(d));
};
