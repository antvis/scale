import Quantile from '../../src/continuous/quantile';
import '../../src/tick-method/index';

describe('test quantile scale', () => {

  it('init', () => {
    const scale = new Quantile({
      min: 0,
      max: 100
    });
    expect(scale.min).toBe(0);
    expect(scale.type).toBe('quantile');
    expect(scale.ticks).toEqual([]);
  });

  it('ticks', () => {
    const scale = new Quantile({
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });
    expect(scale.ticks).toEqual([0, 2, 5, 8, 10]);
    expect(scale.scale(4)).toBe(0.25);
    expect(scale.invert(0.5)).toBe(5);
  });
});