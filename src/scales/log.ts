import { Continuous } from './continuous';
import { LogOptions } from '../types';
import { createInterpolate } from '../utils';
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
  protected getDefaultOptions(): LogOptions {
    return {
      domain: [1, 10],
      range: [0, 1],
      base: 10,
      interpolate: createInterpolate,
      tickMethod: rPretty,
      tickCount: 5,
    };
  }

  protected chooseTransforms() {
    const { base, domain } = this.options;
    const shouldReflect = domain[0] < 0;
    return [transformLog(base, shouldReflect), transformPow(base, shouldReflect)];
  }

  public clone(): Log {
    return new Log(this.options);
  }
}
