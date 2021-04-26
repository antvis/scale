import { NiceMethod } from '../types';

// function tickInterval(min, max, count, interval) {}

export const d3TimeNice: NiceMethod = (a, b, count, interval) => {
  // const r = a < b;
  // const min = Math.min(a, b);
  // const max = Math.max(a, b);
  // const time = tickInterval(a, b, count, interval);
  // const niceDomain = time ? time.range(min, max + 1) : [];
  // return r ? niceDomain : niceDomain.reverse();
  return [a, b, count, interval];
};
