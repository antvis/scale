import { identity } from '@antv/util';
import { Continuous, Transform } from './continuous';
import { LinearOptions } from '../types';
import { Base } from './base';
import { createInterpolate, d3LinearNice } from '../utils';
import { wilkinsonExtended } from '../tick-method/wilkinson-extended';

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
      tickMethod: wilkinsonExtended,
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

  public getTicks() {
    const { tickCount, domain, tickMethod } = this.options;
    const lastIndex = domain.length - 1;
    const dMin = domain[0];
    const dMax = domain[lastIndex];
    return tickMethod(dMin, dMax, tickCount);
  }

  protected nice() {
    const { domain } = this.options;
    this.options.domain = d3LinearNice(domain);
  }
}
