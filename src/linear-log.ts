import * as _ from '@antv/util';
import Linear from './linear';

export default class Log extends Linear {
  public base: number;

  public scale(value: number): number {
    // 覆写主要是为了性能
    const range0 = _.head(this.range);
    const range1 = _.last(this.range);
    const percent = Math.log(value / this.min) / Math.log(this.max / this.min);

    return this._calcValue(percent, range0, range1);
  }

  public invert(scaled: number): number {
    const range0 = _.head(this.range);
    const range1 = _.last(this.range);
    const percent = this._calcPercent(scaled, range0, range1);

    if (this.min < 0) {
      return -Math.pow(-this.max, percent) * Math.pow(-this.min, 1 - percent);
    }

    return Math.pow(this.max, percent) * Math.pow(this.min, 1 - percent);
  }

  protected _initDefaultCfg() {
    this.type = 'log';
    this.values = [];
    this.base = 10;
  }

  protected _init() {
    // todo log breaks要优化
    this.ticks = this._setTicks();
    // 不兼容处理定义域包含0的情况
  }
}
