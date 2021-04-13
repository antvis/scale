import { Pow } from '../../../src/scales/pow';

describe('pow scales', () => {
  test('map fn', () => {
    const scale = new Pow({
      domain: [0, 100],
      exponent: 2,
    });

    expect(scale.map(25)).toBeCloseTo(0.5, 0.1);
    expect(scale.map(50)).toBeCloseTo(Math.sqrt(0.5));
    expect(scale.map(0)).toStrictEqual(0);
    expect(scale.map(100)).toStrictEqual(1);
  });

  test('invert fn', () => {
    const scale = new Pow({
      domain: [0, 100],
      exponent: 2,
    });

    expect(scale.invert(0)).toStrictEqual(0);
    expect(scale.invert(0.5)).toStrictEqual(25);
    // 50.00000000000001
    expect(scale.invert(Math.sqrt(0.5))).toBeCloseTo(50, 0.001);
    expect(scale.invert(1)).toStrictEqual(100);
  });

  test('test getTicks', () => {
    const scale = new Pow({
      domain: [0, 120],
      exponent: 2,
    });

    // getTicks Method
    expect(scale.getTicks()).toStrictEqual([0, 4, 16, 36, 64, 100, 144]);

    // update tickCount
    scale.update({
      tickCount: 10,
    });
    expect(scale.getTicks()).toStrictEqual([0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121]);
  });

  test('test negative data', () => {
    const scale = new Pow({
      domain: [-120, 120],
      exponent: 2,
      range: [-100, 100],
    });

    expect(scale.map(0)).toStrictEqual(0);
    expect(scale.map(60)).toBeCloseTo(70.71, -2);
    expect(scale.map(-60)).toBeCloseTo(-70.71, -2);
    expect(scale.getTicks()).toStrictEqual([-225, -100, -25, 0, 25, 100, 225]);
  });

  test('test nice option', () => {
    const scale = new Pow({
      domain: [0.6, 10.4],
      exponent: 10,
      nice: true,
    });

    // 调用 map 之后才会触发 nice
    expect(scale.map(0)).toStrictEqual(0);

    expect(scale.getOptions().domain).toStrictEqual([0, 11]);
  });
});
