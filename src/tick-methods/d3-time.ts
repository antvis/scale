import { TickMethod } from '../types';
import { d3Linear } from './d3-linear';

// 暂时用 d3Linear 代替
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const d3Time: TickMethod = (min, max, count, interval) => {
  return d3Linear(+min, +max, count).map((d) => new Date(d));
};
