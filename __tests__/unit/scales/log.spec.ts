import { Log } from '../../../src';

describe('log scale test', () => {
  test('test default options', () => {
    const scale = new Log();
    const { domain, range, round, tickCount, nice, clamp, unknown } = scale.getOptions();

    expect(domain).toStrictEqual([1, 10]);
    expect(range).toStrictEqual([0, 1]);
    expect(round).toBeFalsy();
    expect(tickCount).toStrictEqual(5);
    expect(nice).toBeFalsy();
    expect(clamp).toBeFalsy();
    expect(unknown).toBeUndefined();
  });

  test('test map()', () => {
    const scale = new Log({
      domain: [1, 10],
      range: [0, 1],
    });

    expect(scale.map(1)).toStrictEqual(0);
    expect(scale.map(2)).toBeCloseTo(0.301, 3);
    expect(scale.map(5)).toBeCloseTo(0.699, 3);
  });

  test('test invert()', () => {
    const scale = new Log({
      domain: [1, 10],
      range: [0, 1],
    });

    expect(scale.invert(0)).toStrictEqual(1);
    expect(scale.invert(0.301)).toBeCloseTo(1.9999, 4);
    expect(scale.invert(0.698)).toBeCloseTo(4.989, 3);
  });

  test('test for negative data', () => {
    const scale = new Log({
      domain: [-30, -10],
      range: [0, 1],
    });

    expect(scale.map(-30)).toStrictEqual(0);
    expect(scale.map(-20)).toBeCloseTo(0.369, 3);
    expect(scale.map(-16)).toBeCloseTo(0.572, 3);
    expect(scale.invert(0.369)).toBeCloseTo(-20);
  });

  test('clone() returns a Log scale with same and independent options', () => {
    const x1 = new Log();
    const x2 = x1.clone();

    expect(x2).toBeInstanceOf(Log);
    expect(x1.getOptions()).toEqual(x2.getOptions());
    expect(x1.getOptions() !== x2.getOptions()).toBeTruthy();
  });

  test('test nice option', () => {
    const scale = new Log({
      domain: [1.6, 10.4],
      nice: true,
    });

    // 调用 map 之后才会触发 nice
    expect(scale.map(1)).toStrictEqual(0);

    expect(scale.getOptions().domain).toStrictEqual([1, 11]);
  });

  test('test getTicks', () => {
    const scale = new Log({
      domain: [0, 120],
      base: 2,
      tickMethod: (min, max, count) => {
        expect(min).toBe(0);
        expect(max).toBe(120);
        expect(count).toBe(5);
        return [];
      },
    });

    // getTicks Method
    expect(scale.getTicks()).toStrictEqual([]);
  });
});
