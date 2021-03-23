import Scale from './scales/base';
import Category from './scales/category';
import TimeCat from './scales/time-cat';
import Linear from './scales/linear';
import Log from './scales/log';
import Pow from './scales/pow';
import Time from './scales/time';
import Quantize from './scales/quantize';
import Quantile from './scales/quantile';
import Identity from './scales/identity';

import { ScaleConfig, Tick } from './types';

export {
  // scales
  Category,
  // alias
  Category as Cat,
  Identity,
  Linear,
  Log,
  Pow,
  Time,
  TimeCat,
  Quantile,
  Quantize,
  Scale,
  // others
  ScaleConfig,
  Tick,
};

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
