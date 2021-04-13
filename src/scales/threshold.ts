import { isNumber } from '@antv/util';
import { Base } from './base';
import { Domain, ThresholdOptions, Range } from '../types';
import { bisect } from '../utils';

export class Threshold<O extends ThresholdOptions> extends Base<ThresholdOptions> {
  protected n: number;

  protected getOverrideDefaultOptions() {
    return {
      domain: [0.5],
      range: [0, 1],
    } as O;
  }

  constructor(options?: Partial<ThresholdOptions>) {
    super(options);
    this.rescale();
  }

  public map(x: Domain<ThresholdOptions>) {
    if (!isNumber(x) || Number.isNaN(x)) return this.options.unknown;
    const index = bisect(this.getDomain(), x, 0, this.n);
    return this.options.range[index];
  }

  public invert(y: Range<ThresholdOptions>) {
    const { range, domain } = this.options;
    const index = range.indexOf(y);
    return [domain[index - 1], domain[index]];
  }

  public clone() {
    return new Threshold(this.options);
  }

  public update(options?: Partial<ThresholdOptions>) {
    super.update(options);
    this.rescale();
  }

  protected rescale() {
    const { domain, range } = this.options;
    this.n = Math.min(domain.length, range.length - 1);
  }

  protected getDomain() {
    return this.options.domain;
  }
}
