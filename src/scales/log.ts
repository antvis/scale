import { Continuous } from './continuous';
import { LogOptions, PowOptions } from '../types';
import { createInterpolate, d3LinearNice } from '../utils';
import { pretty } from '../tick-methods/pretty';

const reflect = (f) => {
  return (x) => -f(-x);
};

const transformLog = (base: number, shouldReflect: boolean) => {
  let logFn;

  if (base === Math.E) {
    logFn = Math.log;
  } else if (base === 10) {
    logFn = Math.log10;
  } else if (base === 2) {
    logFn = Math.log2;
  } else {
    // 使用换底公式
    logFn = (x) => Math.log(x > 0 ? x : -x) / Math.log(base > 0 ? base : -base);
  }

  return shouldReflect ? reflect(logFn) : logFn;
};

const unTransformLog = (base: number, shouldReflect: boolean) => {
  const pow = base === Math.E ? Math.exp : (x) => (base > 0 ? base ** x : (-base) ** x);
  return shouldReflect ? reflect(pow) : pow;
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
    const { base, domain } = this.options;
    const isReflect = domain[0] < 0;
    return transformLog(base, isReflect);
  }

  protected chooseUntransform() {
    const { base, domain } = this.options;
    const isReflect = domain[0] < 0;
    return unTransformLog(base, isReflect);
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
