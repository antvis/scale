import { NiceMethod } from '../types';
import { d3LinearNice } from './d3-linear-nice';

// 暂时用 d3LinearNice 代替
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const d3TimeNice: NiceMethod = (min, max, count, interval) => {
  return d3LinearNice(+min, +max, count).map((d) => new Date(d));
};
