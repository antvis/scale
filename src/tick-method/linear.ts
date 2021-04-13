import { head, last } from '@antv/util';
import { LinearOptions } from '../types';
import extended from '../utils/extended';

/**
 * 计算线性的 ticks，使用 wilkinson extended 方法
 *
 * @param config 度量的配置项
 * @returns {number[]} 计算后的 ticks
 */
export function linerTick(config: LinearOptions): number[] {
  const { tickCount, domain, nice } = config;
  const dMin = head(domain);
  const dMax = last(domain);
  return extended(dMin, dMax, tickCount, nice).ticks;
}
