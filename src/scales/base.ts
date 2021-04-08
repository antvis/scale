import { assign } from '@antv/util';
import { BaseOptions, Domain, Range, Unknown } from '../types';

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

  /** 比例尺扽默认选项，子类可以自定义默认选项 */
  protected defaultOptions: O = {
    domain: [0, 1],
    range: [0, 1],
    formatter: (x: Range<O>) => `${x}`,
  } as O;

  /**
   * 构造函数
   * @param options 需要自定义配置的选项
   */
  constructor(options?: Partial<O>) {
    assign(this.defaultOptions, this.getDefaultOptions());
    assign(this.options, this.defaultOptions, options);
  }

  /**
   * 子类需要覆盖的默认配置
   */
  protected getDefaultOptions(): Partial<O> {
    return {} as O;
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
}
