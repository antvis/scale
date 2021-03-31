import { assign } from '@antv/util';
import { BaseOptions } from '../types';
import { ticks } from '../tick-method/basic';
import { Domain, Range, Unknown } from '../utils/type';

export const DEFAULT_OPTIONS: BaseOptions = {
  domain: [0, 1],
  range: [0, 1],
  tickCount: 5,
  tickInterval: 10,
  formatter: (x: Range<BaseOptions>) => `${x}`,
  tickMethod: ticks,
};

export abstract class Base<O extends BaseOptions> {
  /**
   * 将定义域里面的一个值，根据转换规则，转换为值域的一个值。
   * 如果该值不合法，则返回 options.unknown
   * @param x 需要转换的值
   */
  abstract map(x: Domain<O>): Range<O> | Unknown<O>;

  /**
   * 将值域里的一个值，据转换规则，逆向转换为定义域里的一个值或者一个区间
   * @param x 需要转换的值
   */
  abstract invert(x: Range<O>): Domain<O> | Domain<O>[];

  /**
   * 克隆一个新的比例尺，可以用于更新选项
   */
  abstract clone(): Base<O>;

  /** 比例尺的选项，用于配置数据映射的规则和 ticks 的生成方式 */
  protected options: O = {} as O;

  /**
   * 构造函数
   * @param options 需要自定义配置的选项
   * @param defaultOptions 默认选项，主要用于子类调用 super(options, ownDefaultOptions)
   */
  constructor(options?: Partial<O>, defaultOptions: O = DEFAULT_OPTIONS as O) {
    assign(this.options, defaultOptions, options);
  }

  /**
   * 返回当前的所有选项
   * @returns
   */
  public getOptions() {
    return this.options;
  }

  /**
   * 更新选项
   * @param updateOptions 需要更新的选项
   */
  public update(updateOptions: Partial<O>) {
    assign(this.options, updateOptions);
  }

  /**
   * 根据比例尺的配置去生成 ticks，该 ticks 主要用于生成坐标轴
   * @returns 返回一个 ticks 的数组
   */
  public getTicks(): Range<O>[] {
    return this.options.tickMethod(this.options);
  }
}
