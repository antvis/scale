import { identity } from '@antv/util';
import { Continuous, Transform } from './continuous';
import { LinearOptions } from '../types';
import { Base } from './base';
import { createInterpolate } from '../utils';
import { linerTick } from '../tick-method/linear';
import { d3LinearNice } from '../utils/d3-linear-nice';

export class Linear extends Continuous<LinearOptions> {
  protected chooseTransform(): Transform {
    return identity;
  }

  protected getOverrideDefaultOptions() {
    return {
      nice: false,
      clamp: false,
      round: false,
      interpolate: createInterpolate,
      tickMethod: linerTick,
      tickCount: 5,
    } as LinearOptions;
  }

  protected chooseUntransform(): Transform {
    return identity;
  }

  constructor(options?: LinearOptions) {
    super(options);
  }

  clone(): Base<LinearOptions> {
    return new Linear(this.options);
  }

  public nice() {
    const { domain } = this.options;
    this.options.domain = d3LinearNice(domain);
  }
}
