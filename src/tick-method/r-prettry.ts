import { ScaleConfig } from '../types';
import interval from '../util/interval';
import pretty from '../util/pretty';

/**
 * 计算线性的 ticks，使用 R's pretty 方法
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export default function linearPretty(cfg: ScaleConfig): number[] {
  const { min, max, tickCount, tickInterval } = cfg;
  if (tickInterval) {
    return interval(min, max, tickInterval).ticks;
  }
  return pretty(min, max, tickCount).ticks;
}
