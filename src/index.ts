export * from './types';

export { Scale } from './scales/base';
export { Category } from './scales/category';
export { TimeCat } from './scales/time-cat';
export { Linear } from './scales/linear';
export { Log } from './scales/log';
export { Pow } from './scales/pow';
export { Time } from './scales/time';
export { Quantize } from './scales/quantize';
export { Quantile } from './scales/quantile';
export { Identity } from './scales/identity';

// 内置的 tick method，以及追加方法
export {
  cat,
  d3Linear,
  linear,
  log,
  pow,
  quantile,
  pretty,
  time,
  timeCat,
  timePretty,
  registerTickMethod,
} from './tick-methods';
