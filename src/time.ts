import * as _ from '@antv/util';
import * as Fecha from 'fecha';
import Base, { ScaleConfig } from './base';
import bisector from './util/bisector';
import pretty from './util/pretty';

const fecha = Fecha as any;

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

type Interval = [string, number]; // [defaultMomentFormat, interval]

export interface TimeScaleConfig extends ScaleConfig {
  values: number[];
  min: number;
  max: number;
  tickCount: number;
  tickInterval: number;
  showLast: boolean;
}

export default class Time extends Base {
  public values: number[];
  public min: number;
  public max: number;
  /** 强制显示最大日期 */
  public showLast: TimeScaleConfig['showLast'];
  public tickCount: TimeScaleConfig['tickCount'];
  public tickInterval: TimeScaleConfig['tickInterval'];
  public interval: Interval;
  public breaks: string;

  /** 将定义域转化为时间戳 */
  public translate(v: number): number {
    return this._toTimeStamp(v);
  }

  public scale(_value: number): number {
    const min = this.min;
    const max = this.max;
    const value = Math.min(Math.max(this.translate(_value), min), max);
    const percent = this._calcPercent(value, min, max);
    const range0 = _.head(this.range);
    const range1 = _.last(this.range);
    return this._calcValue(percent, range0, range1);
  }

  public invert(scaled: number) {
    const range0 = _.head(this.range);
    const range1 = _.last(this.range);
    const min = this.min;
    const max = this.max;
    const percent = this._calcPercent(scaled, range0, range1);

    return this._calcValue(percent, min, max);
  }

  protected _initDefaultCfg() {
    this.type = 'time';
    this.values = [];
    this.tickCount = 10;
  }

  protected _init() {
    this.values = _.map(this.values, (date) => this.translate(date));
    this._setDomain();
    if (_.isEmpty(this.ticks)) {
      if (this.tickInterval) {
        this.ticks = this._setTicksByInterval();
      } else if (this.tickCount) {
        this.ticks = this._setTicks();
      }
    }
  }

  protected _setDomain() {
    if (_.isNil(this.min)) {
      this.min = _.minBy(this.values, (v) => v);
    } else {
      this.min = this.translate(this.min);
    }
    if (_.isNil(this.max)) {
      this.max = _.maxBy(this.values, (v) => v);
    } else {
      this.max = this.translate(this.max);
    }
  }

  /**
   * todo: 自创算法，融合了d3和pretty，需要大量测例验证
   */
  private _setTicks() {
    /**
     * 思路：
     * step1: 通过d3的算法找到日期大致范围
     * step2: 通过pretty取得系数为1、0.5、2
     */
    const intervals: Interval[] = [
      ['HH:mm:ss', SECOND],
      ['HH:mm:ss', SECOND * 10],
      ['HH:mm:ss', SECOND * 30],
      ['HH:mm', MINUTE],
      ['HH:mm', MINUTE * 10],
      ['HH:mm', MINUTE * 30],
      ['HH', HOUR],
      ['HH', HOUR * 6],
      ['HH', HOUR * 12],
      ['YYYY-MM-DD', DAY],
      ['YYYY-MM-DD', DAY * 4],
      ['YYYY-WW', DAY * 7],
      ['YYYY-MM', DAY * 31],
      ['YYYY-MM', DAY * 31 * 4],
      ['YYYY-MM', DAY * 31 * 6],
      ['YYYY', DAY * 380], // 借鉴echarts，保证每个周期累加时不会碰到恰巧不够的问题
    ];
    let tickCount = this.tickCount;
    const minDate = this.min;
    const maxDate = this.max;
    const target = (maxDate - minDate) / tickCount;
    const idx = bisector((o: Interval) => o[1])(intervals, target);
    if (idx === intervals.length) {
      // over 1Y
      this.interval = _.last(intervals);
    } else if (idx) {
      this.interval = intervals[idx];
    } else {
      // 避免pretty取0.5，可以在此处加一个最大值边界
      // 此处的Math.min是没有意义的（为什么？），此处保留只是因为可能会调整算法，这个是安全保障
      tickCount = Math.min(Math.floor((maxDate - minDate) / SECOND), tickCount);
      this.interval = intervals[0];
    }
    const d = this.interval[1];
    const { ticks } = pretty(0, Math.ceil((maxDate - minDate) / d), tickCount);
    // time的tick不能取超出定义域的值
    const res = ticks.map((tick) => tick * d + minDate).filter((tick) => tick >= minDate && tick <= maxDate);
    if (this.showLast) {
      // 间隔大于一个interval时需添加，pretty可以避免这种场景
      res[res.length - 1] = this.max;
    }

    if (!this.formatter) {
      this.formatter = (v: number) => fecha.format(v, this.interval[0]);
    }
    return res;
  }

  private _setTicksByInterval() {
    const minDate = this.min;
    const maxDate = this.max;
    const d = this.tickInterval[1];
    const tickCount = Math.ceil((maxDate - minDate) / d);
    const ticks = [];
    for (let i = 0; i <= tickCount; i++) {
      let val = minDate + d * i;
      if (val > maxDate && this.showLast) {
        val = maxDate;
      }
      ticks.push(val);
    }
    const formatedTicks = [];
    _.each(ticks, (tick) => {
      formatedTicks.push(fecha.format(tick, this.tickInterval[0]));
    });
    return formatedTicks;
  }

  private _toTimeStamp(value) {
    if (_.isString(value)) {
      if (value.indexOf('T') > 0) {
        value = new Date(value).getTime();
      } else {
        value = new Date(value.replace(/-/gi, '/')).getTime();
      }
    }
    if (_.isDate(value)) {
      value = value.getTime();
    }
    return value;
  }
}
