import { log } from '../utils/log';
import { LogOptions } from '../types';
import { wilkinsonExtended } from '../utils/wilkinson-extended';

export function calculateLogTicks(config: LogOptions) {
  const { base, tickCount, domain } = config;
  const lastIndex = domain.length - 1;
  const domainMin = domain[0];
  const domainMax = domain[lastIndex];

  const max = Math.ceil(log(base, domainMax));
  const min = Math.floor(log(base, domainMin));
  const { ticks } = wilkinsonExtended(min, max, tickCount);
  const ticksResult = [];
  for (let i = 0; i < ticks.length; i += 1) {
    const t = ticks[i];
    ticksResult.push(base ** t);
  }
  return ticksResult;
}
