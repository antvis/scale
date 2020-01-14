import cat from './cat';
import linear from './linear';
import rPretty from './r-prettry';
import { getTickMethod, registerTickMethod } from './register';
import time from './time';
import timeCat from './time-cat';

import log from './log';
import pow from './pow';
import quantile from './quantile';
import timePretty from './time-pretty';

registerTickMethod('cat', cat);
registerTickMethod('time-cat', timeCat);
registerTickMethod('wilkinson-extended', linear);
registerTickMethod('r-pretty', rPretty);
registerTickMethod('time', time);
registerTickMethod('time-pretty', timePretty);
registerTickMethod('log', log);
registerTickMethod('pow', pow);
registerTickMethod('quantile', quantile);
export { getTickMethod };
