import { TickMethod } from '../types';

export const d3Time: TickMethod = (min, max, n) => {
  return [min, max, n];
};
