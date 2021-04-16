import { Threshold } from './threshold';
import { QuantizeOptions } from '../types';
import { wilkinsonExtended } from '../tick-methods/wilkinson-extended';
import { d3LinearNice } from '../utils/d3-linear-nice';

export class Quantize extends Threshold<QuantizeOptions> {
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

  protected niceDomain() {
    const { nice, domain } = this.options;
    if (nice) {
      this.options.domain = d3LinearNice(domain);
    }
  }

  protected rescale() {
    this.niceDomain();

    const { range, domain, nice, tickCount } = this.options;
    this.n = range.length - 1;
    this.thresholds = new Array(this.n);
    const [x0, x1] = nice ? d3LinearNice(domain, tickCount) : domain;

    for (let i = 0; i < this.n; i += 1) {
      this.thresholds[i] = ((i + 1) * x1 - (i - this.n) * x0) / (this.n + 1);
    }
  }

  public getThresholds() {
    return this.thresholds;
  }

  public clone() {
    return new Quantize(this.options);
  }

  public getTicks() {
    const { tickCount, domain, tickMethod } = this.options;
    const lastIndex = domain.length - 1;
    const min = domain[0];
    const max = domain[lastIndex];
    return tickMethod(min, max, tickCount);
  }
}
