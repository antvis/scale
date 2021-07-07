import { d3Ticks as fn } from '../../../src';

describe('d3 ticks', () => {
  test('common usage', () => {
    expect(fn(0, 1000, 10)).toStrictEqual([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);

    expect(fn(-100, 100, 10)).toStrictEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
  });

  test('start is same as stop', () => {
    expect(fn(100, 100, 5)).toStrictEqual([100]);
  });

  test('count is 0 or negative', () => {
    expect(fn(100, 1000, 0)).toStrictEqual([]);
    expect(fn(100, 1000, -3)).toStrictEqual([]);
  });

  test('reverse data', () => {
    expect(fn(0.1, 0.8, 5)).toStrictEqual([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
  });

  test('handle decimal tickCount', () => {
    expect(fn(0, 5, 0.4)).toStrictEqual([0]);
    expect(fn(0, 5, 1.5)).toStrictEqual([0, 5]);
  });

  test('handle negative tickCount', () => {
    expect(fn(0, 5, -1)).toStrictEqual(fn(0, 5, 0));
    expect(fn(0, 5, -1.2)).toStrictEqual(fn(0, 5, 0));
  });
});
