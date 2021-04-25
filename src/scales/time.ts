import { Continuous } from './continuous';
import { TimeOptions } from '../types';
import { d3Time } from '../tick-methods/time';
import { d3TimeNice, createInterpolate } from '../utils';

export class Time extends Continuous<TimeOptions> {
  protected getDefaultOptions(): TimeOptions {
    return {
      domain: [new Date(2000, 0, 1), new Date(2000, 0, 2)],
      range: [0, 1],
      nice: false,
      tickCount: 10,
      tickInterval: undefined,
      unknown: undefined,
      clamp: false,
      tickMethod: d3Time,
      interpolate: createInterpolate,
      mask: undefined,
      utc: false,
    };
  }

  protected chooseTransforms() {
    const transform = (x: Date) => +x;
    const untransform = (x: number) => new Date(x);
    return [transform, untransform];
  }

  protected chooseNice() {
    return d3TimeNice;
  }

  public getFormatter() {}

  public clone() {
    return new Time(this.options);
  }
}
