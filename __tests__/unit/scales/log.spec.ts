import { Log } from '../../../src';

describe('log scale test', () => {
  test('test map()', () => {
    const scale = new Log({
      domain: [1, 10],
      range: [0, 1],
    });

    expect(scale.map(1)).toStrictEqual(0);
    expect(scale.map(2)).toBeCloseTo(0.301, -3);
    expect(scale.map(5)).toBeCloseTo(0.698, -3);
  });

  test('test invert()', () => {
    const scale = new Log({
      domain: [1, 10],
      range: [0, 1],
    });

    expect(scale.invert(0)).toStrictEqual(1);
    expect(scale.invert(0.301)).toBeCloseTo(1.999, -3);
    expect(scale.invert(0.698)).toBeCloseTo(4.988, -3);
  });

  test('clone() returns a Log scale with same and independent options', () => {
    const x1 = new Log();
    const x2 = x1.clone();

    expect(x2).toBeInstanceOf(Log);
    expect(x1.getOptions()).toEqual(x2.getOptions());
    expect(x1.getOptions() !== x2.getOptions()).toBeTruthy();
  });
});
