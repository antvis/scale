import { Continuous } from './continuous';
import { LogOptions, PowOptions } from '../types';
import { createInterpolate, d3LinearNice } from '../utils';
import { rPretty } from '../tick-methods/r-pretty';

const reflect = (f) => {
  return (x) => -f(-x);
};

const transformLog = (base: number, shouldReflect: boolean) => {
  let logFn;

  if (base === Math.E) {
    logFn = Math.log;
  } else {
    // 只计算一次 Math.log(base)
    const baseCache = Math.log(base);
    // 使用换底公式
    logFn = (x) => Math.log(x) / baseCache;
  }

  return shouldReflect ? reflect(logFn) : logFn;
};

const transformPow = (base: number, shouldReflect: boolean) => {
  const pow = base === Math.E ? Math.exp : (x) => base ** x;
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
      tickMethod: rPretty,
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
    return transformPow(base, isReflect);
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
