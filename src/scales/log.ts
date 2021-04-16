import { Continuous } from './continuous';
import { LogOptions, PowOptions } from '../types';
import { createInterpolate } from '../utils';
import { log } from '../utils/log';
import { calculateLogTicks } from '../tick-method/log';

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
      tickMethod: calculateLogTicks,
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

  protected nice(): void {}
}
