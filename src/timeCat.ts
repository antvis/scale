import * as _ from '@antv/util';
import Cat from './category';
import extended from './util/extended';

export default class TimeCat extends Cat {
  protected _initDefaultCfg() {
    super._initDefaultCfg();
    this.type = 'timeCat';
  }

  protected _setTicks() {
    // 默认期望展示的更多
    const tickCount = this.tickCount || Math.ceil(this.max / 2);
    const { ticks } = extended(this.min, this.max, tickCount, false, [1, 2, 5, 3, 4, 7, 6, 8, 9]);

    const res = _.map(ticks, (tickIdx: number) => this.values[tickIdx]);
    // 默认保头保尾
    res[res.length - 1] = _.last(this.values);
    return res;
  }
}
