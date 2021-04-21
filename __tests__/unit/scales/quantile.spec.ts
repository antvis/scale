import { Quantile, QuantileOptions } from '../../../src';
import { wilkinsonExtended } from '../../../src/tick-methods/wilkinson-extended';

describe('Threshold', () => {
  test('Quantile() has expected options', () => {
    const x = new Quantile();
    const { formatter, tickMethod, ...options } = x.getOptions();

    expect(options).toEqual({
      domain: [],
      range: [],
      unknown: undefined,
      tickCount: 5,
    });

    // @ts-ignore
    expect(x.n).toBe(-1);

    expect(x.getThresholds()).toEqual([]);
    expect(tickMethod).toBe(wilkinsonExtended);
    expect(formatter(1)).toBe('1');
  });

  test('Threshold(options) override default options', () => {
    const options: QuantileOptions = {
      domain: [2, 10],
    };

    const x = new Quantile(options);

    expect(x.getOptions().domain).toEqual([2, 10]);
  });

  test('map(null | NaN | undefined) map falsy to options.unknown', () => {
    const x = new Quantile({
      unknown: 'dirty',
    });
    expect(x.map(null)).toBe('dirty');
    expect(x.map(NaN)).toBe('dirty');
    expect(x.map(undefined)).toBe('dirty');
  });

  test('map(x) map a number to a discrete value in range', () => {
    const x = new Quantile({
      domain: [0, 20, 40],
      range: ['a', 'b', 'c', 'd'],
    });

    expect(x.map(0)).toBe('a');
    expect(x.map(0.2)).toBe('a');
    expect(x.map(10)).toBe('b');
    expect(x.map(20)).toBe('c');
    expect(x.map(25)).toBe('c');
    expect(x.map(50)).toBe('d');
  });

  test('invert(x) returns the domain extent for the specified range value', () => {
    const x = new Quantile({
      domain: [0, 20, 40],
      range: ['a', 'b', 'c', 'd'],
    });

    expect(x.getThresholds()).toStrictEqual([10, 20, 30]);

    expect(x.invert('a')).toEqual([0, 10]);
    expect(x.invert('b')).toEqual([10, 20]);
    expect(x.invert('c')).toEqual([20, 30]);
    expect(x.invert('d')).toEqual([30, 40]);
    expect(x.invert('e')).toEqual([undefined, undefined]);
  });

  test('getThresholds() returns the array of computed thresholds within the domain.', () => {
    const x = new Quantile({
      domain: [1, 10],
      range: ['a', 'b', 'c'],
    });
    expect(x.getThresholds()).toEqual([4, 7]);
  });

  test('getTicks() calls options.tickMethod and return its return value', () => {
    const scale = new Quantile({
      domain: [0, 100],
      tickMethod: (min, max, count) => {
        expect(min).toBe(0);
        expect(max).toBe(100);
        expect(count).toBe(5);
        return [];
      },
    });
    expect(scale.getTicks()).toStrictEqual([]);
  });

  test('update(options) rescale', () => {
    const x = new Quantile();
    x.update({
      domain: [1, 10],
      range: ['a', 'b', 'c'],
    });

    // @ts-ignore
    expect(x.n).toBe(2);
    expect(x.getThresholds()).toEqual([4, 7]);
  });

  test('clone() returns a Quantile scale with same and independent options ', () => {
    const x1 = new Quantile();
    const x2 = x1.clone();

    expect(x2).toBeInstanceOf(Quantile);
    expect(x1.getOptions()).toEqual(x2.getOptions());
    expect(x1.getOptions() !== x2.getOptions()).toBeTruthy();
  });
});
