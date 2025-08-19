import { identity, isArray, last } from '@antv/util';
import { Continuous } from './continuous';
import { LinearOptions, Transform } from '../types';
import { Base } from './base';
import { createInterpolateValue } from '../utils';
import { d3Ticks } from '../tick-methods/d3-ticks';

/**
 * Linear 比例尺
 *
 * 构造可创建一个在输入和输出之间具有线性关系的比例尺
 */
export class Linear extends Continuous<LinearOptions> {
  protected getDefaultOptions(): LinearOptions {
    return {
      domain: [0, 1],
      range: [0, 1],
      unknown: undefined,
      nice: false,
      clamp: false,
      round: false,
      interpolate: createInterpolateValue,
      tickMethod: d3Ticks,
      tickCount: 5,
    };
  }

  protected transformDomain(options: LinearOptions): { breaksDomain: number[]; breaksRange: number[] } {
    const { domain, range = [1, 0], breaks = [], tickCount = 5 } = options;
    const [domainMin, domainMax] = [Math.min(...domain), Math.max(...domain)];
    const sortedBreaks = breaks.filter(({ end }) => end < domainMax).sort((a, b) => a.start - b.start);
    const breaksDomain = d3Ticks(domainMin, domainMax, tickCount, sortedBreaks);
    if (last(breaksDomain) < domainMax) {
      breaksDomain.push(domainMax);
    }
    const [r0, r1] = [range[0], last(range)] as number[];
    const diffDomain = domainMax - domainMin;
    const diffRange = Math.abs(r1 - r0);
    const reverse = r0 > r1;
    // Calculate the new range based on breaks.
    const breaksRange = breaksDomain.map((d) => {
      const ratio = (d - domainMin) / diffDomain;
      return reverse ? r0 - ratio * diffRange : r0 + ratio * diffRange;
    });
    // Compress the range scale according to breaks.
    sortedBreaks.forEach(({ start, end, gap = 0.05 }) => {
      const startIndex = breaksDomain.indexOf(start);
      const endIndex = breaksDomain.indexOf(end);
      const center = (breaksRange[startIndex] + breaksRange[endIndex]) / 2;
      const scaledSpan = gap * diffRange;
      // Calculate the new start and end values based on the center and scaled span.
      const startValue = reverse ? center + scaledSpan / 2 : center - scaledSpan / 2;
      const endValue = reverse ? center - scaledSpan / 2 : center + scaledSpan / 2;
      breaksRange[startIndex] = startValue;
      breaksRange[endIndex] = endValue;
    });
    return { breaksDomain, breaksRange };
  }

  protected transformBreaks(options: LinearOptions): LinearOptions {
    const { domain, breaks = [] } = options;
    if (!isArray(options.breaks)) return options;
    const domainMax = Math.max(...domain);
    const filteredBreaks = breaks.filter(({ end }) => end < domainMax);
    const optWithFilteredBreaks = { ...options, breaks: filteredBreaks };
    const { breaksDomain, breaksRange } = this.transformDomain(optWithFilteredBreaks);
    return {
      ...options,
      domain: breaksDomain,
      range: breaksRange,
      breaks: filteredBreaks,
      tickMethod: () => [...breaksDomain],
    };
  }

  protected chooseTransforms(): Transform[] {
    return [identity, identity];
  }

  public clone(): Base<LinearOptions> {
    return new Linear(this.options);
  }
}
