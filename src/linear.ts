import * as _ from '@antv/util';
import Base, { ScaleConfig, ScaleType } from './base';
import extended, { ALL_Q } from './util/extended';

export default class Linear extends Base {
  public type: ScaleType;
  public isLinear: Base['isLinear'];
  public values: ScaleConfig['values'];
  public min?: ScaleConfig['min'];
  public max?: ScaleConfig['max'];
  public minLimit?: ScaleConfig['minLimit'];
  public maxLimit?: ScaleConfig['maxLimit'];
  public tickCount?: ScaleConfig['tickCount'];
  public maxTickCount?: ScaleConfig['maxTickCount'];
  public minTickInterval?: ScaleConfig['minTickInterval'];
  public nice?: ScaleConfig['nice'];
  public algoParam: ScaleConfig['algoParam'];

  public scale(_value: number): number {
    if (_.isNil(_value)) {
      return NaN;
    }
    const max = this._transform(this.max);
    const min = this._transform(this.min);
    if (min === max) {
      // https://github.com/d3/d3-scale/blob/master/src/continuous.js normalize
      return 0.5;
    }
    // min <= value <= max
    const value = Math.min(Math.max(this._transform(_value), min), max);
    const percent = this._calcPercent(value, min, max);
    const range0 = _.head(this.range);
    const range1 = _.last(this.range);
    return this._calcValue(percent, range0, range1);
  }

  public invert(scaled: number): number {
    const range0 = _.head(this.range);
    const range1 = _.last(this.range);
    const max = this._transform(this.max);
    const min = this._transform(this.min);
    const percent = this._calcPercent(scaled, range0, range1);

    return this._calcValue(percent, min, max);
  }

  protected _initDefaultCfg() {
    this.values = [];
    this.type = 'linear';
    this.isLinear = true;
    this.nice = true;
    this.tickCount = 5;
    this.maxTickCount = 10;
  }

  protected _init() {
    this._setDomain();
    if (_.isEmpty(this.ticks)) {
      this.ticks = this._setTicks();
    }
  }

  protected _setDomain() {
    const { min, max } = _.getRange(this.values);
    if (_.isNil(this.min)) {
      this.min = min;
    }
    if (_.isNil(this.max)) {
      this.max = max;
    }
    if (this.min > this.max) {
      console.error('min should less than max');
      this.min = min;
      this.max = max;
    }
  }

  protected _transform(v: number): number {
    return v;
  }

  protected _setTicks(): number[] {
    const { onlyLoose, Q, w, m } = this._getAlgoParams();
    let adjustTicks = [];
    let tickCnt = m;
    let minLimit = this.minLimit;
    let maxLimit = this.maxLimit;
    let tickMin;
    let tickMax;

    // minLimit/maxLimit相同情况处理
    if (!_.isNil(minLimit) && !_.isNil(maxLimit) && minLimit === maxLimit) {
      console.error('minLimit should less than maxLimit');
      minLimit = minLimit / 2;
      if (minLimit === 0) {
        maxLimit = 1;
      }
    }
    tickMin = _.isNil(minLimit) ? this.min : this.minLimit;
    tickMax = _.isNil(maxLimit) ? this.max : this.maxLimit;

    // 最终的min/max校验和处理
    if (tickMin > tickMax) {
      console.error('minLimit should less than maxLimit');
      [tickMin, tickMax] = [tickMax, tickMin];
      [minLimit, maxLimit] = [maxLimit, minLimit];
    }

    do {
      const { min, max, ticks } = extended(tickMin, tickMax, tickCnt, onlyLoose, Q, w);
      adjustTicks = [];

      if (this.nice) {
        this.min = min;
        this.max = max;
      }

      // 修正min/max
      if (!_.isNil(minLimit)) {
        this.min = minLimit;
      }
      if (!_.isNil(maxLimit)) {
        this.max = maxLimit;
      }

      adjustTicks.push(this.min);
      _.each(ticks, (tick) => {
        if (tick > this.min && tick < this.max) {
          adjustTicks.push(tick);
        }
      });
      if (adjustTicks[adjustTicks.length - 1] < this.max) {
        adjustTicks.push(this.max);
      }

      // 如果没有设置 minLimit/maxLimit，就不循环
      if (_.isNil(minLimit) && _.isNil(maxLimit)) {
        break;
      }

      // 效果是否已经很好了
      if (ticks.indexOf(this.min) >= 0 && ticks.indexOf(this.max) >= 0) {
        break;
      }
      tickCnt += 1;
    } while (tickCnt < this.maxTickCount);

    return adjustTicks;
  }

  private _getAlgoParams(): ScaleConfig['algoParam'] & { m: number } {
    const { onlyLoose, Q: _Q, w } = this.algoParam || ({} as any);
    let Q: number[] = _Q;
    let m = this.tickCount;
    if (this.minTickInterval) {
      const interval = Math.abs(this.minTickInterval);
      const e = Math.floor(Math.log10(interval));
      // interval转为 (0, 10) 之间的值
      const i = interval / Math.pow(10, e);
      Q = ALL_Q.filter((n) => n >= i);

      if (!_.includes(Q, i)) {
        Q.push(i);
      }
      // tickCount也需要相应调整
      m = Math.ceil((this.max - this.min) / this.minTickInterval) + 1;

      // nice numbers数组长度不能<2
      if (Q.length === 1) {
        Q.push(1);
      }
    }
    return {
      m,
      w,
      Q,
      onlyLoose,
    };
  }
}
