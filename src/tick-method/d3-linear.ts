import { head, isNil, last } from '@antv/util';
import { ScaleConfig } from '../types';
import { d3Linear as d3LinearMethod } from '../util/d3-linear';
import { interval } from '../util/interval';
import { strictLimit } from '../util/strict-limit';

export function d3Linear(cfg: ScaleConfig): number[] {
  const { min, max, tickInterval, minLimit, maxLimit } = cfg;
  const ticks = d3LinearMethod(cfg);

  if (!isNil(minLimit) || !isNil(maxLimit)) {
    return strictLimit(cfg, head(ticks), last(ticks));
  }
  if (tickInterval) {
    return interval(min, max, tickInterval).ticks;
  }
  return ticks;
}
