import { Continuous, Transform } from './continuous';
import { PowOptions } from '../types';
import { Base } from './base';
import { calculateBase } from '../utils/calculate-base';
import { createInterpolate } from '../utils';
import { calculatePowTicks } from '../tick-method/pow';
import { d3LinearNice } from '../utils/d3-linear-nice';

export class Pow extends Continuous<PowOptions> {
  protected getOverrideDefaultOptions() {
    return {
      nice: false,
      clamp: false,
      round: false,
      interpolate: createInterpolate,
      tickMethod: calculatePowTicks,
      tickCount: 5,
    } as PowOptions;
  }

  protected chooseTransform(): Transform {
    return (x: number) => {
      const rangeMin = this.options.range[0];
      const rangeMax = this.options.range[1];
      const percent = this.getRangePercent(x);
      return rangeMin + percent * (rangeMax - rangeMin);
    };
  }

  protected chooseUntransform(): Transform {
    return (y: number) => {
      // 获取 y 在值域中所占的百分比
      const percent = this.getInvertPercent(y);
      const { exponent } = this.options;
      const domainMin = this.getOptions().domain[0];
      const domainMax = this.getOptions().domain[1];
      const min = calculateBase(exponent, domainMin);
      const max = calculateBase(exponent, domainMax);

      const tmp = min + percent * (max - min);
      const factor = tmp >= 0 ? 1 : -1;
      return tmp ** exponent * factor;
    };
  }

  clone(): Base<PowOptions> {
    return new Pow(this.options);
  }

  private getRangePercent(value: number) {
    const domainMin = this.getOptions().domain[0];
    const domainMax = this.getOptions().domain[1];
    if (domainMin === domainMax) {
      return 0;
    }
    const { exponent } = this.getOptions();
    const deltaX = calculateBase(exponent, value) - calculateBase(exponent, domainMin);
    const deltaDomain = calculateBase(exponent, domainMax) - calculateBase(exponent, domainMin);
    return deltaX / deltaDomain;
  }

  private getInvertPercent(value: number) {
    const rangeMin = this.getOptions().range[0];
    const rangeMax = this.getOptions().range[1];
    return (value - rangeMin) / (rangeMax - rangeMin);
  }

  protected nice() {
    const { domain } = this.options;
    this.options.domain = d3LinearNice(domain);
  }
}
