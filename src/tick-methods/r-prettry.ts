import { head, isNil, last } from '@antv/util';
import { ScaleConfig } from '../types';
import { interval } from '../utils/interval';
import { pretty as prettyMethod } from '../utils/pretty';
import { strictLimit } from '../utils/strict-limit';

/**
 * 计算线性的 ticks，使用 R's pretty 方法
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export function pretty(cfg: ScaleConfig): number[] {
  const { min, max, tickCount, tickInterval, minLimit, maxLimit } = cfg;
  const ticks = prettyMethod(min, max, tickCount).ticks;

  if (!isNil(minLimit) || !isNil(maxLimit)) {
    return strictLimit(cfg, head(ticks), last(ticks));
  }
  if (tickInterval) {
    return interval(min, max, tickInterval).ticks;
  }
  return ticks;
}
