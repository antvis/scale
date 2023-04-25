import { Threshold, ThresholdOptions } from '../../../src';

describe('Threshold', () => {
  test('static type', () => {
    expect(Threshold.type).toBe('Threshold');
  });

  test('Threshold() has expected options', () => {
    const x = new Threshold();
    expect(x.getOptions()).toEqual({
      domain: [0.5],
      range: [0, 1],
      unknown: undefined,
    });

    // @ts-ignore
    expect(x.n).toBe(1);
  });

  test('Threshold(options) override default options', () => {
    const options: ThresholdOptions = {
      domain: [1],
    };

    const x = new Threshold(options);

    expect(x.getOptions().domain).toEqual([1]);
  });

  test('map(null | NaN | undefined) map falsy to options.unknown', () => {
    const x = new Threshold({
      unknown: 'dirty',
    });
    expect(x.map(null)).toBe('dirty');
    expect(x.map(NaN)).toBe('dirty');
    expect(x.map(undefined)).toBe('dirty');
  });

  test('map(x) map a number to a discrete value in range', () => {
    const x = new Threshold({
      domain: [1 / 3, 2 / 3],
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
    const x = new Threshold({
      domain: [1 / 3, 2 / 3],
      range: ['a', 'b', 'c'],
    });

    expect(x.invert('a')).toEqual([undefined, 1 / 3]);
    expect(x.invert('b')).toEqual([1 / 3, 2 / 3]);
    expect(x.invert('c')).toEqual([2 / 3, undefined]);
    expect(x.invert('d')).toEqual([undefined, undefined]);
  });

  test('update(options) update n', () => {
    const x = new Threshold();

    // @ts-ignore
    expect(x.n).toBe(1);

    x.update({
      domain: [0, 1],
      range: ['a', 'b', 'c'],
    });

    // @ts-ignore
    expect(x.n).toBe(2);
  });

  test('clone() returns a Threshold scale with same and independent options ', () => {
    const x1 = new Threshold();
    const x2 = x1.clone();

    expect(x2).toBeInstanceOf(Threshold);
    expect(x1.getOptions()).toEqual(x2.getOptions());
    expect(x1.getOptions() !== x2.getOptions()).toBeTruthy();
  });
});
