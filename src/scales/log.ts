import { Continuous } from './continuous';
import { LogOptions } from '../types';
import { createInterpolate } from '../utils';
import { rPretty } from '../tick-methods/r-pretty';

const reflect = (f: Function) => {
  return (x: number) => -f(-x);
};

const transformLog = (base: number, shouldReflect: boolean) => {
  const baseCache = Math.log(base);
  const log = base === Math.E ? Math.log : (x: number) => Math.log(x) / baseCache;
  return shouldReflect ? reflect(log) : log;
};

const transformPow = (base: number, shouldReflect: boolean) => {
  const pow = base === Math.E ? Math.exp : (x: number) => base ** x;
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

  protected nice() {
    if (!this.options.nice) return;
    const { domain } = this.options;
    const [a, b] = domain;
    const r = a > b;
    const min = r ? b : a;
    const max = r ? a : b;
    const [log, pow] = this.chooseTransforms();
    const niceDomain = [pow(Math.floor(log(min))), pow(Math.ceil(log(max)))];
    this.options.domain = r ? niceDomain.reverse() : niceDomain;
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
