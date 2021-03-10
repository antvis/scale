import Scale from './base';
import Category from './category/base';
import TimeCat from './category/time';
import Linear from './continuous/linear';
import Log from './continuous/log';
import Pow from './continuous/pow';
import Time from './continuous/time';
import Quantize from './continuous/quantize';
import Quantile from './continuous/quantile';
import Identity from './identity';

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
export { cat, d3Linear, linear, log, pow, quantile, pretty, time, timeCat, timePretty, registerTickMethod } from './tick-method';
