import { Continuous } from './continuous';
import { LogOptions, PowOptions } from '../types';
import { createInterpolate, d3LinearNice } from '../utils';
import { log } from '../utils/log';
import { pretty } from '../tick-methods/pretty';

const transformLog = (base: number) => {
  return (x: number) => {
    return log(base, x);
  };
};

const unTransformLog = (base: number) => {
  return (y: number) => {
    return base ** y;
  };
};

/**
 * Linear 比例尺
 *
 * 构造一个线性的对数比例尺
 */
export class Log extends Continuous<LogOptions> {
  protected getOverrideDefaultOptions() {
    return {
      domain: [1, 10],
      range: [0, 1],
      base: 10,
      interpolate: createInterpolate,
      tickMethod: pretty,
      tickCount: 5,
    } as PowOptions;
  }

  protected chooseTransform() {
    return transformLog(this.options.base);
  }

  protected chooseUntransform() {
    return unTransformLog(this.options.base);
  }

  public clone(): Log {
    return new Log(this.options);
  }

  protected nice(): void {
    const { domain } = this.options;
    this.options.domain = d3LinearNice(domain);
  }

  public getTicks() {
    const { tickCount, domain, tickMethod, base } = this.options;
    const lastIndex = domain.length - 1;
    const dMin = domain[0];
    const dMax = domain[lastIndex];
    return tickMethod(dMin, dMax, tickCount, base);
  }
}
