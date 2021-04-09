import { BandOptions } from '../types';
import { Category } from './category';
import { sequence } from '../utils/sequence';

/**
 * Band 比例尺
 *
 * 一种特殊的 category scale，区别在于值域的范围是连续的。
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
 * TODO: 补充性能优化描述
 */
export class Band extends Category<BandOptions> {
  // 步长，见上图
  private step: number;

  // band 的 range 属性，由于 band 是基于 category 的，range 会被转换
  // 当用户直接获取 option.range 时，获取的属性是转化后的 range
  // 如果你需要获取转换前的 range，那么必须调用 getBandRange 方法
  private bandRange: number[];

  // 覆盖默认配置
  protected getOverrideDefaultOptions() {
    return {
      domain: [],
      range: [0, 1],
      align: 0.5,
      bandWidth: 0,
      round: false,
      paddingInner: 0,
      paddingOuter: 0,
      padding: 0,
      unknown: undefined,
    };
  }

  constructor(options?: Partial<BandOptions>) {
    super(options);
    // 保存用户传入的 range
    this.bandRange = options.range;

    // 配置步长
    this.step = 1;

    // 为 band 作初始化工作
    this.adjustBandState();
  }

  /**
   * 更新/调整 band 配置
   */
  private adjustBandState() {
    const opt = this.getOptions() as BandOptions;

    let rangeStart = opt.range[0];
    const rangeEnd = opt.range[1];

    // 当用户配置了opt.padding 且非 0 时，我们覆盖已经设置的 paddingInner paddingOuter
    // 我们约定 padding 的优先级较 paddingInner 和 paddingOuter 高
    if (opt.padding > 0) {
      opt.paddingInner = opt.padding;
      opt.paddingOuter = opt.padding;
    }

    // 配置了 rangeRound
    if (opt.rangeRound) {
      opt.range = opt.rangeRound;
      opt.round = true;
    }

    const stepAmount = opt.domain.length;

    // range 的计算方式如下：
    // = stop - start
    // = (stepAmount * step(n 个 step) )
    // + (2 * step * paddingOuter(两边的 padding))
    // - (1 * step * paddingInner(多出的一个 inner))
    const deltaRange = rangeEnd - rangeStart;
    const outerTotal = opt.paddingOuter * 2;
    const innerTotal = stepAmount - opt.paddingInner;
    this.step = deltaRange / Math.max(1, outerTotal + innerTotal);

    // 优化成整数
    if (opt.round) {
      this.step = Math.floor(this.step);
    }

    // 基于 align 实现偏移
    rangeStart += (deltaRange - this.step * (stepAmount - opt.paddingInner)) * opt.align;

    // 一个 step 的组成如下：
    // step = bandWidth + step * paddingInner，
    // 则 bandWidth = step - step * (paddingInner)
    opt.bandWidth = this.step * (1 - opt.paddingInner);

    if (opt.round) {
      rangeStart = Math.round(rangeStart);
      opt.bandWidth = Math.round(opt.bandWidth);
    }

    // 转化后的 range
    this.options.range = sequence(rangeStart, rangeEnd, this.step);
  }

  clone() {
    return new Band(this.options);
  }

  public update(updateOptions: Partial<BandOptions>) {
    // 更新 band 相关配置
    this.adjustBandState();
    // 调用 category 的 update
    super.update(updateOptions);
  }

  public getStep() {
    return this.step;
  }

  public getBandRange() {
    return this.bandRange;
  }
}
