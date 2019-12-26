import { getScale, registerScale } from './factory';

import Scale, { ScaleConfig } from './base';
import Category from './category';
import Identity from './identity';
import Linear from './linear';
import Log from './linear-log';
import Pow from './linear-pow';
import Time from './time';
import TimeCat from './timeCat';

registerScale('cat', Category);
registerScale('category', Category);
registerScale('identity', Identity);
registerScale('linear', Linear);
registerScale('log', Log);
registerScale('pow', Pow);
registerScale('time', Time);
registerScale('timeCat', TimeCat);

export { Category, Identity, Linear, Log, Pow, Time, TimeCat, Scale, getScale, registerScale, ScaleConfig };
