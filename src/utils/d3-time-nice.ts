import { NiceMethod } from '../types';

// 暂时用 d3LinearNice 代替
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const d3TimeNice: NiceMethod = (min, max, count, interval) => {
  return [min, max];
};
