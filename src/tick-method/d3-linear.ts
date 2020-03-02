import { ScaleConfig } from '../types';
import d3Linear from '../util/d3-linear';
import interval from '../util/interval';

export default function d3LinearTickMethod(cfg: ScaleConfig): number[] {
  const { min, max, tickInterval } = cfg;
  if (tickInterval) {
    return interval(min, max, tickInterval).ticks;
  }
  return d3Linear(cfg);
}
