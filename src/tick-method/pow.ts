/**
 * 计算 Pow 的 ticks
 *
 * @param cfg 度量的配置项
 * @returns {array[]} 计算后的ticks
 */
import { PowOptions } from '../types';
import { calculateBase } from '../utils/calculate-base';
import { pretty } from '../utils/pretty';

export function calculatePowTicks(config: PowOptions) {
  const { exponent, tickCount, domain } = config;

  const lastIndex = domain.length - 1;
  const domainMin = domain[0];
  const domainMax = domain[lastIndex];

  const max = Math.ceil(calculateBase(exponent, domainMax));
  const min = Math.floor(calculateBase(exponent, domainMin));

  const { ticks } = pretty(min, max, tickCount);

  const ticksResult = [];
  for (let i = 0; i < ticks.length; i += 1) {
    const t = ticks[i];
    const factor = t >= 0 ? 1 : -1;
    ticksResult.push(t ** exponent * factor);
  }
  return ticksResult;
}
