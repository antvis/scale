import * as _ from '@antv/util';

export type ScaleType = 'base' | 'linear' | 'cat' | 'log' | 'pow' | 'identity' | 'time' | 'timeCat';

export interface Tick {
  /** 展示名 */
  text: string;
  /** 值域值 */
  value: number;
  /** 定义域值 */
  tickValue: string | number;
}

export type ScaleConfig = Partial<{
  /** 对应的字段id */
  field: string;
  /** 输入域、定义域 */
  values: any[];
  /** 定义域的最小值，d3为domain，ggplot2为limits，分类型下无效 */
  min: any;
  /** 定义域的最大值，分类型下无效 */
  max: any;

  /** 数据字段的显示别名，scale内部不感知，外部注入 */
  alias: string;
  /** 输出域、值域，默认值为[0, 1] */
  range: number[];
  /** Identity有效，非数值情况的返回值 */
  unknown: any;
  /** Log有效，底数 */
  base: number;
  /** Pow有效，指数 */
  exponent: number;

  // tick相关配置
  /** 自动调整min、max */
  nice: boolean;
  /** 用于指定tick，优先级最高 */
  ticks: any[];
  /** 算法参数 */
  algoParam: Partial<{
    onlyLoose: boolean;
    Q: number[];
    w: [number, number, number, number];
  }>;
  /** tick间隔，只对分类型和时间型适用，优先级高于tickCount */
  tickInterval: number;
  /** tick最小间隔，只对线型适用 */
  minTickInterval: number;
  /** tick个数，默认值为5 */
  tickCount: number;
  /** tick格式化函数，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示 */
  formatter: (v: any, k?: number) => string;
}>;

export default abstract class Scale {
  public type: ScaleType = 'base';
  public isCategory?: boolean;
  public isLinear?: boolean;

  public field?: ScaleConfig['field'];
  public alias?: ScaleConfig['alias'];
  public values: ScaleConfig['values'];
  public min?: ScaleConfig['min'];
  public max?: ScaleConfig['max'];
  public range: ScaleConfig['range'] = [0, 1];
  public ticks: ScaleConfig['ticks'] = [];
  public formatter?: ScaleConfig['formatter'];

  protected __cfg__: ScaleConfig; // 缓存的旧配置

  constructor(cfg: ScaleConfig) {
    this.__cfg__ = cfg;
    this._initDefaultCfg();
    _.assign(this, cfg);
    this._init();
  }

  // 对于原始值的必要转换，如分类、时间字段需转换成数值，用transform/map命名可能更好
  public translate(v: any) {
    return v;
  }

  /** 将定义域转换为值域 */
  public abstract scale(value: any): number;

  /** 将值域转换为定义域 */
  public abstract invert(scaled: number): any;

  /** 重新初始化 */
  public change(cfg: ScaleConfig) {
    this.constructor(_.assign(this.__cfg__, cfg));
  }

  public clone(): Scale {
    return this.constructor(this.__cfg__);
  }

  /** 获取坐标轴需要的ticks */
  public getTicks(): Tick[] {
    return _.map(this.ticks, (tick: any, idx: number) => {
      if (_.isObject(tick)) {
        // 仅当符合Tick类型时才有意义
        // _.some(['text', 'value', 'tickValue'], key => {
        //   if (_.has(tick, key)) {
        //     return false;
        //   }
        //   console.warn(`A tick need ${key} property.`);
        //   return true;
        // });
        return tick as Tick;
      }
      return {
        text: this.getText(tick, idx),
        tickValue: tick, // 原始value
        value: this.scale(tick), // scaled
      };
    });
  }

  /** 获取Tick的格式化结果 */
  public getText(value: any, key?: number): string {
    const formatter = this.formatter;
    const res = formatter ? formatter(value, key) : value;
    if (_.isNil(res) || !_.isFunction(res.toString)) {
      return '';
    }
    return res.toString();
  }

  // scale初始化
  protected abstract _initDefaultCfg(): void;
  protected abstract _init(): void;

  /** 定义域转 0~1 */
  protected _calcPercent(value: any, min: number, max: number): number {
    if (_.isNumber(value)) {
      return (value - min) / (max - min);
    }
    return NaN;
  }

  /** 0~1转定义域 */
  protected _calcValue(percent: number, min: number, max: number): number {
    return min + percent * (max - min);
  }
}
