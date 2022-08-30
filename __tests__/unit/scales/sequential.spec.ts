import { identity } from '@antv/util';
import { Sequential } from '../../../src';
import { d3Ticks } from '../../../src/tick-methods/d3-ticks';

describe('Sequential Scale Test', () => {
  test('test default options', () => {
    const scale = new Sequential();
    const { domain, interpolator, range, round, tickCount, nice, clamp, unknown, tickMethod } = scale.getOptions();

    expect(domain).toStrictEqual([0, 1]);
    expect(interpolator).toStrictEqual(identity);
    expect(range).toStrictEqual([0, 1]);
    expect(round).toBeFalsy();
    expect(tickCount).toStrictEqual(5);
    expect(nice).toBeFalsy();
    expect(clamp).toBeFalsy();
    expect(unknown).toBeUndefined();
    expect(tickMethod).toBe(d3Ticks);
  });

  test('test interpolator fn', () => {
    const scale = new Sequential({
      domain: [0, 10],
      interpolator: (t) => 1 - t,
    });
    expect(scale.map(5)).toStrictEqual(0.5);
    expect(scale.map(2)).toStrictEqual(0.8);
    expect(scale.map(8)).toStrictEqual(0.19999999999999996);
    expect(scale.getOptions().range).toStrictEqual([1, 0]);

    scale.update({
      domain: [10, 0],
    });
    expect(scale.map(2)).toStrictEqual(0.19999999999999996);
    expect(scale.map(8)).toStrictEqual(0.8);
    expect(scale.getOptions().range).toStrictEqual([1, 0]);

    scale.update({
      domain: [5, 5],
    });
    expect(scale.map(5)).toStrictEqual(0.5);
    expect(scale.map(2)).toStrictEqual(0.5);
    expect(scale.map(8)).toStrictEqual(0.5);
    expect(scale.getOptions().range).toStrictEqual([1, 0]);
  });

  test('test round the output', () => {
    const scale = new Sequential({
      domain: [0, 10],
      interpolator: (t) => 2 * t + 1,
      round: true,
    });
    expect(scale.map(5)).toStrictEqual(2);
    expect(scale.map(2)).toStrictEqual(1);
    expect(scale.map(8)).toStrictEqual(3);
    expect(scale.getOptions().range).toStrictEqual([1, 3]);

    scale.update({
      interpolator: (t) => `test: ${2 * t + 1}`,
    });
    expect(scale.map(5)).toStrictEqual('test: 2');
    expect(scale.map(2)).toStrictEqual('test: 1.4');
    expect(scale.map(8)).toStrictEqual('test: 2.6');
    expect(scale.getOptions().range).toStrictEqual(['test: 1', 'test: 3']);
  });

  test('test nice the domain', () => {
    const scale = new Sequential({
      domain: [1.1, 10.9],
      nice: true,
    });

    expect(scale.getOptions().domain).toStrictEqual([0, 12]);
  });

  test('test getTicks()', () => {
    const scale = new Sequential({
      domain: [0, 10],
      interpolator: (t) => 1 - t,
      round: true,
    });
    expect(scale.getTicks()).toStrictEqual([0, 2, 4, 6, 8, 10]);

    scale.update({
      tickCount: 10,
    });
    expect(scale.getTicks()).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('test clone', () => {
    const scale = new Sequential({
      domain: [0, 10],
      interpolator: (t) => 1 - t,
    });

    const newScale = scale.clone();
    expect(scale.getOptions()).toStrictEqual(newScale.getOptions());
    expect(scale.getOptions() === newScale.getOptions()).toBeFalsy();
  });
});
