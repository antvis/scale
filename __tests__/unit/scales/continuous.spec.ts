import { identity } from '@antv/util';
import { Continuous } from '../../../src/scales/continuous';
import { ContinuousOptions } from '../../../src/types';
import { createInterpolate } from '../../../src/utils';
import { Interpolate } from '../../../src';

describe('Continuous', () => {
  type ScaleOptions = ContinuousOptions;

  const niceCallback = jest.fn();
  const transformCallback = jest.fn();
  const untransformCallback = jest.fn();

  class Scale extends Continuous<ScaleOptions> {
    protected chooseUntransform() {
      return (x) => {
        untransformCallback();
        return identity(x);
      };
    }

    protected chooseTransform() {
      return (x) => {
        transformCallback();
        return identity(x);
      };
    }

    protected nice() {
      niceCallback();
      this.options.domain = [0, 2];
    }

    public clone() {
      return new Scale(this.options);
    }

    public getTicks() {
      return [];
    }
  }

  test('Continuous() has expected defaults', () => {
    const s = new Scale();
    const { formatter, interpolate, ...restProps } = s.getOptions();

    expect(restProps).toEqual({
      range: [0, 1],
      domain: [0, 1],
      clamp: false,
      nice: false,
      round: false,
      tickCount: 5,
    });

    expect(formatter(1)).toBe('1');
    expect(interpolate).toEqual(createInterpolate);

    // @ts-ignore
    expect(s.output).toBeUndefined();

    // @ts-ignore
    expect(s.input).toBeUndefined();
  });

  test('Continuous(options) override defaults', () => {
    const options: ScaleOptions = {
      tickCount: 20,
      domain: [0, 10],
    };

    const s = new Scale(options);

    // @ts-ignore
    expect(s.options.tickCount).toBe(20);
    // @ts-ignore
    expect(s.options.domain).toEqual([0, 10]);
  });

  test('map(undefined | NaN | null) map undefined or NaN to options.unknown', () => {
    const s = new Scale({
      unknown: 'dirty',
    });
    expect(s.map(undefined)).toBe('dirty');
    expect(s.map(NaN)).toBe('dirty');
    expect(s.map(null)).toBe('dirty');

    // @ts-ignore
    expect(s.output).toBeUndefined();
  });

  test('invert(undefined | NaN | null) invert undefined or NaN to options.unknown', () => {
    const s = new Scale({
      unknown: 'dirty',
    });
    expect(s.invert(undefined)).toBe('dirty');
    expect(s.invert(NaN)).toBe('dirty');
    expect(s.invert(null)).toBe('dirty');

    // @ts-ignore
    expect(s.input).toBeUndefined();
  });

  test('map(x) calls transform', () => {
    const s = new Scale();

    // @ts-ignore
    expect(transformCallback).not.toBeCalled();

    s.map(0);

    // @ts-ignore
    expect(transformCallback).toBeCalled();
  });

  test('invert(x) calls untransform', () => {
    const s = new Scale();
    // @ts-ignore
    expect(untransformCallback).not.toBeCalled();

    s.invert(0);

    // @ts-ignore
    expect(untransformCallback).toBeCalled();
  });

  test('map(x) call nice() if options.nice === true', () => {
    const s = new Scale({
      nice: true,
    });

    s.map(0);
    expect(niceCallback).toBeCalledTimes(1);
    expect(s.getOptions().domain).toEqual([0, 2]);
  });

  test('invert(x) call nice() if options.nice === true', () => {
    const s = new Scale({
      nice: true,
    });

    s.invert(0);
    expect(niceCallback).toBeCalledTimes(2);
    expect(s.getOptions().domain).toEqual([0, 2]);
  });

  test('map(x) compose the output', () => {
    const s = new Scale();
    s.map(0);

    // @ts-ignore
    expect(s.output).not.toBeUndefined();
  });

  test('invert(x) compose the input', () => {
    const s = new Scale();
    s.invert(0);

    // @ts-ignore
    expect(s.invert).not.toBeUndefined();
  });

  test('map(x) bimaps a domain value x to range y', () => {
    const s = new Scale();

    // maps
    expect(s.map(0)).toBe(0);
    expect(s.map(0.5)).toBeGreaterThan(0);
    expect(s.map(0.5)).toBeLessThan(1);
    expect(s.map(1)).toBe(1);

    // inverts
    expect(s.invert(0)).toBe(0);
    expect(s.invert(0.5)).toBeGreaterThan(0);
    expect(s.invert(0.5)).toBeLessThan(1);
    expect(s.invert(1)).toBe(1);
  });

  test('map(x) polymaps a domain value x to range y ', () => {
    const s = new Scale({
      domain: [0, 5, 10],
      range: [0, 50, 1000],
    });

    // maps
    expect(s.map(0)).toBe(0);
    expect(s.map(3)).toBeGreaterThan(0);
    expect(s.map(3)).toBeLessThan(50);
    expect(s.map(5)).toEqual(50);
    expect(s.map(7)).toBeGreaterThan(50);
    expect(s.map(7)).toBeLessThan(1000);
    expect(s.map(10)).toEqual(1000);

    // invert
    expect(s.invert(0)).toBe(0);
    expect(s.invert(30)).toBeGreaterThan(0);
    expect(s.invert(30)).toBeLessThan(5);
    expect(s.invert(50)).toEqual(5);
    expect(s.invert(700)).toBeGreaterThan(5);
    expect(s.invert(700)).toBeLessThan(10);
    expect(s.invert(1000)).toEqual(10);
  });

  test('map(x) change descending domain to ascending', () => {
    const s = new Scale({
      domain: [10, 0],
      range: [100, 10],
    });

    // maps
    expect(s.map(10)).toBe(100);
    expect(s.map(0)).toBe(10);
    expect(s.invert(100)).toBe(10);
    expect(s.invert(10)).toBe(0);

    s.update({
      domain: [10, 5, 0],
      range: [1000, 5, -1],
    });
    expect(s.map(10)).toBe(1000);
    expect(s.map(5)).toBe(5);
    expect(s.map(0)).toBe(-1);
    expect(s.invert(1000)).toBe(10);
    expect(s.invert(5)).toBe(5);
    expect(s.invert(-1)).toBe(0);
  });

  test('map(x) ignores extra range values if the domain is smaller than the range', () => {
    const s = new Scale({
      domain: [0, 5],
      range: [0, 50, 100],
    });

    expect(s.map(0)).toBe(0);
    expect(s.map(5)).toBe(50);
  });

  test('map(x) ignores extra domain values if the range is smaller than the domain', () => {
    const s = new Scale({
      range: [0, 5],
      domain: [0, 50, 100],
    });

    expect(s.map(0)).toBe(0);
    expect(s.map(50)).toBe(5);
  });

  test('map(x) maps an empty domain to the middle of the range', () => {
    const s = new Scale({
      range: [0, 6],
      domain: [],
    });

    expect(s.map(1)).toBe(3);
    expect(s.map(2)).toBe(3);
  });

  test('invert(x) inverts an empty range to the middle of the domain', () => {
    const s = new Scale({
      domain: [0, 6],
      range: [],
    });

    expect(s.invert(1)).toBe(3);
    expect(s.invert(2)).toBe(3);
  });

  test('update(options) updates options', () => {
    const s = new Scale();

    s.update({
      domain: [0, 10],
    });

    const options = s.getOptions();
    expect(options.domain).toEqual([0, 10]);
  });

  test('update(options) clears output and input functions', () => {
    const s = new Scale();
    s.map(0);
    s.invert(0);
    s.update({ domain: [0, 1] });

    // @ts-ignore
    expect(s.output).toBeUndefined();

    // @ts-ignore
    expect(s.input).toBeUndefined();
  });

  test('options.interpolate sets a custom interpolator factory', () => {
    // y^2 = mx + b
    const interpolate: Interpolate = (a, b) => (t) => Math.sqrt(a * a * (1 - t) + b * b * t);

    const s = new Scale({
      domain: [0, 4],
      range: [0, 2],
      interpolate,
    });

    expect(s.map(0)).toBe(0);
    expect(s.map(4)).toBe(2);
  });

  test('options.clamp clamps the output', () => {
    const s = new Scale({
      domain: [0, 1],
      range: [0, 10],
    });

    expect(s.map(2)).toBeGreaterThan(10);
    expect(s.map(-1)).toBeLessThan(0);

    s.update({
      clamp: true,
    });

    expect(s.map(2)).toBe(10);
    expect(s.map(-1)).toBe(0);
  });

  test('options.round rounds the output', () => {
    const s = new Scale({
      domain: [0, 1],
      range: [1.3, 11.5],
    });

    expect(s.map(0)).toBe(1.3);
    expect(s.map(0.5)).toBe(6.4);
    expect(s.map(1)).toBe(11.5);

    s.update({
      round: true,
    });

    expect(s.map(0)).toBe(1);
    expect(s.map(0.5)).toBe(6);
    expect(s.map(1)).toBe(12);
  });

  test('getTicks() return []', () => {
    const s = new Scale();
    expect(s.getTicks()).toEqual([]);
  });

  test('clone() returns a scale belong to same class', () => {
    const s = new Scale();
    const s1 = s.clone();
    expect(s1).toBeInstanceOf(Scale);
  });

  test('clone() returns a scale with the same options as the original one', () => {
    const s = new Scale();
    const s1 = s.clone();
    expect(s.getOptions()).toEqual(s1.getOptions());
  });

  test('clone() returns a scale isolating change with the original one', () => {
    const s = new Scale();
    const s1 = s.clone();

    s.update({
      domain: [0, 10],
    });
    expect(s1.getOptions().domain).toEqual([0, 1]);

    s1.update({
      domain: [0, 100],
    });
    expect(s.getOptions().domain).toEqual([0, 10]);
  });
});
