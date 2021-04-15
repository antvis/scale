import { isNumber } from '@antv/util';
import { Base } from './base';
import { Domain, ThresholdOptions, Range } from '../types';
import { bisect } from '../utils';

/**
 * 将连续的定义域分段，每一段所有的值对应离散的值域中一个值
 */
export class Threshold<O extends ThresholdOptions> extends Base<O> {
  /** threshold 的数量 */
  protected n: number;

  protected getOverrideDefaultOptions() {
    return {
      domain: [0.5],
      range: [0, 1],
    } as O;
  }

  constructor(options?: Partial<O>) {
    super(options);
    this.rescale();
  }

  /**
   * 二分查找到输入值在哪一段，返回对应的值域中的值
   */
  public map(x: Domain<ThresholdOptions>) {
    if (!isNumber(x) || Number.isNaN(x)) return this.options.unknown;
    const index = bisect(this.getDomain(), x, 0, this.n);
    return this.options.range[index];
  }

  /**
   * 在值域中找到对应的值，并返回在定义域中属于哪一段
   */
  public invert(y: Range<ThresholdOptions>) {
    const { range } = this.options;
    const index = range.indexOf(y);
    const domain = this.getDomain();
    return [domain[index - 1], domain[index]];
  }

  public clone() {
    return new Threshold<O>(this.options);
  }

  public update(options?: Partial<O>) {
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
