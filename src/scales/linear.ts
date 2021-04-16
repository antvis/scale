import { identity } from '@antv/util';
import { Continuous, Transform } from './continuous';
import { LinearOptions } from '../types';
import { Base } from './base';
import { createInterpolate } from '../utils';
import { d3LinearNice } from '../utils/d3-linear-nice';
import { calculateLogTicks } from '../tick-method/log';

/**
 * Linear 比例尺
 *
 * 构造可创建一个在输入和输出之间具有线性关系的比例尺
 */
export class Linear extends Continuous<LinearOptions> {
  protected getOverrideDefaultOptions() {
    return {
      nice: false,
      clamp: false,
      round: false,
      interpolate: createInterpolate,
      tickMethod: calculateLogTicks,
      tickCount: 5,
    } as LinearOptions;
  }

  protected chooseTransform(): Transform {
    return identity;
  }

  protected chooseUntransform(): Transform {
    return identity;
  }

  public clone(): Base<LinearOptions> {
    return new Linear(this.options);
  }

  protected nice() {
    const { domain } = this.options;
    this.options.domain = d3LinearNice(domain);
  }
}
