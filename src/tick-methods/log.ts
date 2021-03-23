import { isEmpty } from '@antv/util';
import { ScaleConfig } from '../types';
import { getLogPositiveMin, log as logMethod } from '../utils/math';

/**
 * 计算 log 的 ticks，考虑 min = 0 的场景
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export function log(cfg: ScaleConfig) {
  const { base, tickCount, min, max, values } = cfg;
  let minTick;
  const maxTick = logMethod(base, max);
  if (min > 0) {
    minTick = Math.floor(logMethod(base, min));
  } else {
    const positiveMin = getLogPositiveMin(values, base, max);
    minTick = Math.floor(logMethod(base, positiveMin));
  }
  const count = maxTick - minTick;
  const avg = Math.ceil(count / tickCount);
  const ticks = [];
  for (let i = minTick; i < maxTick + avg; i = i + avg) {
    ticks.push(Math.pow(base, i));
  }
  if (min <= 0) {
    // 最小值 <= 0 时显示 0
    ticks.unshift(0);
  }
  return ticks;
}
