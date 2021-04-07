import { clone } from '@antv/util';
import { BandOptions, Domain } from '../types';
import { Base } from './base';
import { Category } from './category';
import { sequence } from '../utils/sequence';

export class Band extends Base<BandOptions> {
  public categoryBase: Category;

  // 覆盖默认配置
  constructor(options?: Partial<BandOptions>) {
    super(options, {
      domain: [],
      range: [0, 1],
      align: 0.5,
      bandWidth: 0,
      step: 1,
      round: false,
      paddingInner: 0,
      paddingOuter: 0,
    });

    this.categoryBase = new Category({
      ...this.options,
    });

    this.adjustBandState();
  }

  private adjustBandState() {
    const opt = this.getOptions();
    const n = opt.domain.length;

    let start = opt.range[0];
    const stop = opt.range[1];
    let step = (stop - start) / Math.max(1, n - opt.paddingInner + opt.paddingOuter * 2);
    if (opt.round) {
      step = Math.floor(step);
    }
    start += (stop - start - step * (n - opt.paddingInner)) * opt.align;

    opt.bandWidth = step * (1 - opt.paddingInner);
    if (opt.round) {
      start = Math.round(start);
      opt.bandWidth = Math.round(opt.bandWidth);
    }

    opt.step = step;

    const targetRange = sequence(start, stop, step);

    // 更新 category range
    this.categoryBase.update({
      range: targetRange,
    });
  }

  public map(x: Domain<BandOptions>) {
    return this.categoryBase.map(x);
  }

  public update(updateOptions: Partial<BandOptions>) {
    super.update(updateOptions);
    this.categoryBase.update(updateOptions);
    this.adjustBandState();
  }

  public invert(y) {
    console.log(this);
    return y;
  }

  public clone() {
    return new Band(clone(this.options));
  }
}
