import { BandOptions } from '../types';
import { Ordinal } from './ordinal';

interface BandStateOptions {
  /** step 的数目。一般是 domain 的长度 */
  stepAmount: number;
  /** 初始的值域，连续 */
  range: number[];
  /** 内部边距 */
  paddingInner?: number;
  /** 两侧边距 */
  paddingOuter?: number;
  /** 是否取整 */
  round?: boolean;
  /** 对齐，取值为 0 - 1 的整数，例如 0.5 表示居中 */
  align?: number;
}

/**
 * 基于 band 基础配置获取 band 的状态
 *
 * @param opt 相关选项
 * @see BandStateOptions
 * @return {object} 一个新对象, 包含以下内容：
 * step -- 步长
 * adjustedRange -- 最终得到的 range
 * bandWidth -- band 宽度
 */
function getBandState(opt: BandStateOptions) {
  const DEFAULT_OPTIONS = {
    range: [0, 1],
    align: 0.5,
    round: false,
    paddingInner: 0,
    paddingOuter: 0,
  };

  const option = {
    ...DEFAULT_OPTIONS,
    ...opt,
  };

  const { range, stepAmount, paddingOuter, paddingInner } = option;

  let step: number;
  let bandWidth: number;

  let rangeStart = range[0];
  const rangeEnd = range[1];

  // range 的计算方式如下：
  // = stop - start
  // = (stepAmount * step(n 个 step) )
  // + (2 * step * paddingOuter(两边的 padding))
  // - (1 * step * paddingInner(多出的一个 inner))
  const deltaRange = rangeEnd - rangeStart;
  const outerTotal = paddingOuter * 2;
  const innerTotal = stepAmount - paddingInner;
  step = deltaRange / Math.max(1, outerTotal + innerTotal);

  // 优化成整数
  if (option.round) {
    step = Math.floor(step);
  }

  // 基于 align 实现偏移
  rangeStart += (deltaRange - step * (stepAmount - paddingInner)) * option.align;

  // 一个 step 的组成如下：
  // step = bandWidth + step * paddingInner，
  // 则 bandWidth = step - step * (paddingInner)
  bandWidth = step * (1 - paddingInner);

  if (option.round) {
    rangeStart = Math.round(rangeStart);
    bandWidth = Math.round(bandWidth);
  }

  // 转化后的 range
  const adjustedRange = new Array(stepAmount).fill(0).map((_, i) => rangeStart + i * step);

  return {
    step,
    adjustedRange,
    bandWidth,
  };
}

/**
 * Band 比例尺
 *
 * 一种特殊的 ordinal scale，区别在于值域的范围是连续的。
 * 使用的场景例如柱状图，可以用来定位各个柱子水平方向距离原点开始绘制的距离、各柱子之间的间距
 *
 * 由于部分选项较为抽象，见下图描述：
 *
 * PO = paddingOuter
 * PI = paddingInner
 *
 * domain = [A, B]
 *
 * |<------------------------------------------- range ------------------------------------------->|
 * |             |                   |             |                   |             |             |
 * |<--step*PO-->|<----bandWidth---->|<--step*PI-->|<----bandWidth---->|<--step*PI-->|<--step*PO-->|
 * |             | ***************** |             | ***************** |             |             |
 * |             | ******* A ******* |             | ******* B ******* |             |             |
 * |             | ***************** |             | ***************** |             |             |
 * |             |<--------------step------------->|                                               |
 * |-----------------------------------------------------------------------------------------------|
 *
 * 性能方便较 d3 快出 8 - 9 倍
 */
export class Band<O extends BandOptions = BandOptions> extends Ordinal<O> {
  // 步长，见上图
  private step: number;

  // band 宽度
  private bandWidth: number;

  // 转换过的 range
  private adjustedRange: O['range'];

  // 覆盖默认配置
  protected getDefaultOptions() {
    return {
      domain: [],
      range: [0, 1],
      align: 0.5,
      round: false,
      paddingInner: 0,
      paddingOuter: 0,
      padding: 0,
      unknown: undefined,
    } as O;
  }

  // 显示指定 options 的类型为 OrdinalOptions，从而推断出 O 的类型
  constructor(options?: BandOptions) {
    super(options as O);
  }

  public clone() {
    return new Band<O>(this.options);
  }

  public getStep() {
    return this.step;
  }

  public getBandWidth() {
    return this.bandWidth;
  }

  public getRange() {
    return this.adjustedRange;
  }

  protected getPaddingInner() {
    const { padding, paddingInner } = this.options;
    return padding > 0 ? padding : paddingInner;
  }

  protected getPaddingOuter() {
    const { padding, paddingOuter } = this.options;
    return padding > 0 ? padding : paddingOuter;
  }

  protected rescale() {
    super.rescale();
    // 当用户配置了opt.padding 且非 0 时，我们覆盖已经设置的 paddingInner paddingOuter
    // 我们约定 padding 的优先级较 paddingInner 和 paddingOuter 高
    const { align, domain, range, round } = this.options;
    const { step, bandWidth, adjustedRange } = getBandState({
      align,
      range,
      round,
      paddingInner: this.getPaddingInner(),
      paddingOuter: this.getPaddingOuter(),
      stepAmount: domain.length,
    });
    // 更新必要的属性
    this.step = step;
    this.bandWidth = bandWidth;
    this.adjustedRange = adjustedRange;
  }
}
