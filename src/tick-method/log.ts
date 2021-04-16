import { log } from '../utils/log';
import { LogOptions } from '../types';

export function calculateLogTicks(config: LogOptions) {
  const { base, tickCount, domain } = config;
  const maxIndex = domain.length - 1;
  const dMin = domain[0];
  const dMax = domain[maxIndex];

  const minTick = Math.floor(log(base, dMin));
  const maxTick = Math.floor(log(base, dMax));

  const count = maxTick - minTick;
  const avg = Math.ceil(count / tickCount);
  const ticks = [];
  for (let i = minTick; i < maxTick + avg; i += avg) {
    ticks.push(base ** i);
  }
  return ticks;
}
