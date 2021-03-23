import { cat } from './cat';
import { d3Linear } from './d3-linear';
import { linear } from './linear';
import { log } from './log';
import { pow } from './pow';
import { quantile } from './quantile';
import { pretty } from './r-prettry';
import { time } from './time';
import { timeCat } from './time-cat';
import { timePretty } from './time-pretty';

const MAP = new Map<string, Function>();

export function getTickMethod(type: string) {
  return MAP.get(type);
}

export function registerTickMethod(type: string, tickMethod: Function) {
  MAP.set(type, tickMethod);
}

registerTickMethod('cat', cat);
// alias
registerTickMethod('wilkinson-extended', linear);
registerTickMethod('r-pretty', pretty);
registerTickMethod('time', time);
registerTickMethod('time-cat', timeCat);
registerTickMethod('time-pretty', timePretty);
registerTickMethod('log', log);
registerTickMethod('pow', pow);
registerTickMethod('quantile', quantile);
// registerTickMethod('d3-linear', d3Linear);

export { cat, d3Linear, linear, log, pow, quantile, pretty, time, timeCat, timePretty };
