import Scale from './base';
import Category from './category/base';
import TimeCat from './category/time';
import Linear from './continuous/linear';
import Log from './continuous/log';
import Pow from './continuous/pow';
import Time from './continuous/time';
import { getScale, registerScale } from './factory';
import Identity from './identity/index';
import { getTickMethod } from './tick-method/index';
import { ScaleConfig } from './types';
registerScale('cat', Category);
registerScale('category', Category);
registerScale('identity', Identity);
registerScale('linear', Linear);
registerScale('log', Log);
registerScale('pow', Pow);
registerScale('time', Time);
registerScale('timeCat', TimeCat);

export {
  Category,
  Identity,
  Linear,
  Log,
  Pow,
  Time,
  TimeCat,
  Scale,
  getScale,
  registerScale,
  ScaleConfig,
  getTickMethod,
};
