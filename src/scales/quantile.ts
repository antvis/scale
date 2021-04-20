import { Threshold } from './threshold';
import { QuantileOptions, QuantizeOptions, Range } from '../types';
import { wilkinsonExtended } from '../tick-methods/wilkinson-extended';

export class Quantile extends Threshold<QuantileOptions> {
  // 这里不能给 thresholds 赋值，否者会编译后，会在 constructor 后面执行：this.thresholds = []
  private thresholds: QuantizeOptions['domain'];

  protected getOverrideDefaultOptions() {
    return {
      domain: [0, 1],
      range: [0.5],
      nice: false,
      tickCount: 5,
      tickMethod: wilkinsonExtended,
    } as QuantizeOptions;
  }

  protected getDomain() {
    return this.thresholds;
  }

  protected rescale() {
    const { range, domain } = this.options;
    const [x0, x1] = domain;

    this.n = range.length - 1;
    this.thresholds = new Array(this.n);

    for (let i = 0; i < this.n; i += 1) {
      this.thresholds[i] = ((i + 1) * x1 - (i - this.n) * x0) / (this.n + 1);
    }
  }

  /**
   * 如果是在第一段后或者最后一段就把两端的值添加上
   */
  public invert(y: Range<QuantizeOptions>) {
    const [a, b] = super.invert(y);
    const [x0, x1] = this.options.domain;
    return a === undefined && b === undefined ? [a, b] : [a || x0, b || x1];
  }

  public getThresholds() {
    return this.thresholds;
  }

  public clone() {
    return new Quantile(this.options);
  }

  public getTicks() {
    const { tickCount, domain, tickMethod } = this.options;
    const lastIndex = domain.length - 1;
    const min = domain[0];
    const max = domain[lastIndex];
    return tickMethod(min, max, tickCount);
  }
}
