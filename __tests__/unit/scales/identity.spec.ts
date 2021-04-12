import { Identity, IdentityOptions } from '../../../src/index';
import { ticks } from '../../../src/tick-method/basic';

describe('Identity', () => {
  test('Identity() has expected defaults', () => {
    const s = new Identity();
    const { tickMethod, formatter, ...restProps } = s.getOptions();

    expect(restProps).toEqual({
      range: [0, 1],
      domain: [0, 1],
      tickCount: 5,
    });
    expect(formatter(1)).toBe('1');
    expect(tickMethod).toEqual(ticks);
  });

  test('Identity(options) override defaults', () => {
    const options: IdentityOptions = {
      tickCount: 20,
      domain: [0, 10],
    };

    const s = new Identity(options);

    // @ts-ignore
    expect(s.options.tickCount).toBe(20);
    // @ts-ignore
    expect(s.options.domain).toEqual([0, 10]);
  });

  test('map(x) is the identity function', () => {
    const x = new Identity();

    expect(x.map(1)).toBe(1);
    expect(x.map(-0.5)).toBe(-0.5);
    expect(x.map(2.5)).toBe(2.5);
  });

  test('map(falsy) to option.unknown', () => {
    const x = new Identity({
      unknown: 'unknown',
    });

    expect(x.map(null)).toBe('unknown');
    expect(x.map(undefined)).toBe('unknown');
    expect(x.map(NaN)).toBe('unknown');
  });

  test('invert(x) is the identity function', () => {
    const x = new Identity();

    expect(x.invert(1)).toBe(1);
    expect(x.invert(-0.5)).toBe(-0.5);
    expect(x.invert(2.5)).toBe(2.5);
  });

  test('getTicks() call options.tickMethod and returns its return value', () => {
    const s = new Identity();
    const mockFn = jest.fn();
    s.update({
      tickMethod: () => {
        mockFn();
        return [1, 2, 3, 4, 5];
      },
    });

    expect(s.getTicks()).toEqual([1, 2, 3, 4, 5]);
    expect(mockFn).toBeCalled();
  });

  test('clone() returns a scale belong to same class', () => {
    const s = new Identity();
    const s1 = s.clone();
    expect(s1).toBeInstanceOf(Identity);
  });

  test('clone() returns a scale with the same options as the original one', () => {
    const s = new Identity();
    const s1 = s.clone();
    expect(s.getOptions()).toEqual(s1.getOptions());
  });

  test('clone() returns a scale isolating change with the original one', () => {
    const s = new Identity();
    const s1 = s.clone();

    s.update({
      tickCount: 20,
    });
    expect(s1.getOptions().tickCount).toBe(5);

    s1.update({
      tickCount: 30,
    });
    expect(s.getOptions().tickCount).toBe(20);
  });
});
