import { LinearOptions } from '../types';
import { wilkinsonExtended } from '../utils/wilkinson-extended';

/**
 * 计算线性的 ticks，使用  linear 方法
 *
 * @param config 度量的配置项
 * @returns {number[]} 计算后的 ticks
 */
export function linear(config: LinearOptions): number[] {
  const { tickCount, domain, nice } = config;

  const lastIndex = domain.length - 1;
  const dMin = domain[0];
  const dMax = domain[lastIndex];
  return wilkinsonExtended(dMin, dMax, tickCount, nice);
}
