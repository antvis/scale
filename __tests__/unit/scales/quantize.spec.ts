import { Quantize, QuantizeOptions } from '../../../src';
import { wilkinsonExtended } from '../../../src/tick-methods/wilkinson-extended';

describe('Threshold', () => {
  test('Quantize() has expected options', () => {
    const x = new Quantize();
    const { formatter, tickMethod, ...options } = x.getOptions();
    expect(options).toEqual({
      domain: [0, 1],
      range: [0.5],
      unknown: undefined,
      nice: false,
      tickCount: 5,
    });

    // @ts-ignore
    expect(x.n).toBe(0);

    // @ts-ignore
    expect(x.thresholds).toEqual([]);
    expect(tickMethod).toBe(wilkinsonExtended);
    expect(formatter(1)).toBe('1');
  });

  test('Threshold(options) override default options', () => {
    const options: QuantizeOptions = {
      domain: [2, 10],
      nice: true,
    };

    const x = new Quantize(options);

    expect(x.getOptions().domain).toEqual([2, 10]);
    expect(x.getOptions().nice).toBe(true);
  });

  test('map(null | NaN | undefined) map falsy to options.unknown', () => {
    const x = new Quantize({
      unknown: 'dirty',
    });
    expect(x.map(null)).toBe('dirty');
    expect(x.map(NaN)).toBe('dirty');
    expect(x.map(undefined)).toBe('dirty');
  });

  test('map(x) map a number to a discrete value in range', () => {
    const x = new Quantize({
      range: ['a', 'b', 'c'],
    });

    expect(x.map(0)).toBe('a');
    expect(x.map(0.2)).toBe('a');
    expect(x.map(0.4)).toBe('b');
    expect(x.map(0.6)).toBe('b');
    expect(x.map(0.8)).toBe('c');
    expect(x.map(1)).toBe('c');
  });

  test('invert(x) returns the domain extent for the specified range value', () => {
    const x = new Quantize({
      range: ['a', 'b', 'c'],
    });

    expect(x.invert('a')).toEqual([undefined, 1 / 3]);
    expect(x.invert('b')).toEqual([1 / 3, 2 / 3]);
    expect(x.invert('c')).toEqual([2 / 3, undefined]);
    expect(x.invert('d')).toEqual([undefined, undefined]);
  });

  test('getThresholds() returns the array of computed thresholds within the domain.', () => {
    const x = new Quantize({
      range: ['a', 'b', 'c'],
    });
    expect(x.getThresholds()).toEqual([1 / 3, 2 / 3]);
  });

  test('getTicks() calls options.tickMethod and return its return value', () => {
    const scale = new Quantize({
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

  test('option.nice === true nice the domain', () => {
    const scale = new Quantize({
      domain: [0.9, 11.1],
      range: ['a', 'b', 'c'],
      nice: true,
    });

    expect(scale.getThresholds()[0]).toBe(4);
    expect(scale.getThresholds()[1]).toBe(8);
  });

  test('update(options) rescale', () => {
    const x = new Quantize();

    x.update({
      domain: [0, 1],
      range: ['a', 'b', 'c'],
    });

    // @ts-ignore
    expect(x.n).toBe(2);
    expect(x.getThresholds()).toEqual([1 / 3, 2 / 3]);
  });

  test('clone() returns a Quantize scale with same and independent options ', () => {
    const x1 = new Quantize();
    const x2 = x1.clone();

    expect(x2).toBeInstanceOf(Quantize);
    expect(x1.getOptions()).toEqual(x2.getOptions());
    expect(x1.getOptions() !== x2.getOptions()).toBeTruthy();
  });
});
