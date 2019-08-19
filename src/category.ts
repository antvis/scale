import * as _ from '@antv/util';
import Base, { ScaleConfig, ScaleType } from './base';
import extended, { ALL_Q } from './util/extended';

export default class Category extends Base {
  public type: ScaleType;
  public isCategory: Base['isCategory'];
  public tickInterval: ScaleConfig['tickInterval'];
  public tickCount: ScaleConfig['tickCount'];

  public translate(value: any): number {
    const index = _.indexOf(this.values, value);
    if (index === -1) {
      return _.isNumber(value) ? value : NaN;
    }
    return index;
  }

  public scale(value: any): number {
    const order = this.translate(value);
    const percent = this._calcPercent(order, this.min, this.max);
    return this._calcValue(percent, _.head(this.range), _.last(this.range));
  }

  public invert(scaledValue: number) {
    if (!_.isNumber(scaledValue)) {
      return scaledValue;
    }
    const size = _.size(this.values) - 1;
    const percent = this._calcPercent(scaledValue, _.head(this.range), _.last(this.range));
    const idx = Math.round(size * percent);
    return this.values[idx];
  }

  public getText(value: any, ...args: any[]): string {
    let v = value;
    // value为index
    if (_.isNumber(value) && !_.includes(this.values, value)) {
      v = this.values[v];
    }
    return super.getText(v, ...args);
  }

  /**
   * ggplot将全数值的定义域视作线性
   * 再三考虑后，分类型scale还是不再支持这种兼容
   */
  // private isAllNumber: boolean;

  protected _initDefaultCfg() {
    this.type = 'cat';
    this.values = [];
    this.isCategory = true;
  }

  protected _init() {
    const size = _.size(this.values);
    this.min = 0;
    this.max = size > 1 ? size - 1 : size;
    if (_.isEmpty(this.ticks)) {
      this.ticks = this._setTicks();
    }
  }

  protected _setTicks() {
    const ticks = this.values;

    if (_.isNumber(this.tickInterval)) {
      return _.filter(ticks, (__: any, i: number) => i % (this.tickInterval + 1) === 0);
    }

    if (_.isNumber(this.tickCount)) {
      // 简单过滤，部分情况下小数的倍数也可以是整数
      const Q = ALL_Q.filter((n) => Number.isInteger(n));
      // tslint:disable-next-line: no-shadowed-variable
      const { ticks } = extended(this.min, this.max, this.tickCount, false, Q);
      const valid = _.filter(ticks, (tick) => tick >= this.min && tick <= this.max);

      return valid.map((index) => this.values[index]);
    }

    return this.values;
  }
}
