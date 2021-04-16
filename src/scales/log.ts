import { Continuous } from './continuous';
import { LogOptions, PowOptions } from '../types';
import { createInterpolate } from '../utils';
import { calculatePowTicks } from '../tick-method/pow';
import { log } from '../utils/log';

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

export class Log extends Continuous<LogOptions> {
  protected getOverrideDefaultOptions() {
    return {
      domain: [1, 10],
      range: [0, 1],
      base: 10,
      interpolate: createInterpolate,
      tickMethod: calculatePowTicks,
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
