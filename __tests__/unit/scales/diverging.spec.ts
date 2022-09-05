import { identity } from '@antv/util';
import { Diverging } from '../../../src';
import { d3Ticks } from '../../../src/tick-methods/d3-ticks';

describe('Diverging Scale Test', () => {
  test('test default options', () => {
    const scale = new Diverging();
    const { domain, interpolator, range, round, tickCount, nice, clamp, unknown, tickMethod } = scale.getOptions();

    expect(domain).toStrictEqual([0, 0.5, 1]);
    expect(interpolator).toStrictEqual(identity);
    expect(range).toStrictEqual([0, 0.5, 1]);
    expect(round).toBeFalsy();
    expect(tickCount).toStrictEqual(5);
    expect(nice).toBeFalsy();
    expect(clamp).toBeFalsy();
    expect(unknown).toBeUndefined();
    expect(tickMethod).toBe(d3Ticks);
  });

  test('test interpolator fn', () => {
    const scale = new Diverging({
      domain: [-10, 0, 10],
      interpolator: (t) => 1 - t,
    });
    expect(scale.map(5)).toStrictEqual(0.25);
    expect(scale.map(2)).toBeCloseTo(0.4, 1);
    expect(scale.map(-5)).toStrictEqual(0.75);
    expect(scale.getOptions().range).toStrictEqual([1, 0.5, 0]);

    scale.update({
      domain: [10, 0, -10],
    });
    expect(scale.map(5)).toStrictEqual(0.75);
    expect(scale.map(2)).toBeCloseTo(0.6, 1);
    expect(scale.map(-5)).toStrictEqual(0.25);
    expect(scale.getOptions().range).toStrictEqual([1, 0.5, 0]);

    scale.update({
      domain: [0, 10],
    });
    expect(scale.map(5)).toStrictEqual(0.75);
    expect(scale.map(2)).toStrictEqual(0.9);
    expect(scale.map(8)).toStrictEqual(0.6);
    expect(scale.getOptions().range).toStrictEqual([1, 0.5, 0]);
  });

  test('test round the output', () => {
    const scale = new Diverging({
      domain: [-10, 0, 10],
      interpolator: (t) => 2 * t + 1,
      round: true,
    });
    expect(scale.map(5)).toStrictEqual(3);
    expect(scale.map(2)).toStrictEqual(2);
    expect(scale.map(-5)).toStrictEqual(2);
    expect(scale.getOptions().range).toStrictEqual([1, 2, 3]);

    scale.update({
      interpolator: (t) => `test: ${2 * t + 1}`,
    });
    expect(scale.map(5)).toStrictEqual('test: 2.5');
    expect(scale.map(2)).toStrictEqual('test: 2.2');
    expect(scale.map(-5)).toStrictEqual('test: 1.5');
    expect(scale.getOptions().range).toStrictEqual(['test: 1', 'test: 2', 'test: 3']);
  });

  test('test getTicks()', () => {
    const scale = new Diverging({
      domain: [-10, 0, 10],
      interpolator: (t) => 1 - t,
    });
    expect(scale.getTicks()).toStrictEqual([-10, -5, 0, 5, 10]);

    scale.update({
      tickCount: 10,
    });
    expect(scale.getTicks()).toStrictEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  });

  test('test clone', () => {
    const scale = new Diverging({
      domain: [-10, 0, 10],
      interpolator: (t) => 1 - t,
    });

    const newScale = scale.clone();
    expect(scale.getOptions()).toStrictEqual(newScale.getOptions());
    expect(scale.getOptions() === newScale.getOptions()).toBeFalsy();
  });
});
