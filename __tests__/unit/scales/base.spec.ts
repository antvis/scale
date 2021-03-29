import Base from '../../../src/scales/base';
import { BaseOptions, Primitive } from '../../../src/types';

class Scale extends Base<BaseOptions> {
  public map(x: Primitive): Primitive {
    return x;
  }

  public invert(x: Primitive): Primitive {
    return x;
  }

  public clone() {
    return new Scale(this.options);
  }
}

describe('Scale', () => {
  test('Scale() has expected defaults', () => {
    const s = new Scale();
    //@ts-ignore
    const { formatter, tickMethod, ...restOptions } = s.options;

    expect(restOptions).toEqual({
      domain: [0, 1],
      range: [0, 1],
      tickCount: 5,
      tickInterval: 10,
    });
    expect(formatter(1)).toBe('1');
    //@ts-ignore
    expect(tickMethod(s.options)).toEqual([]);
  });

  test('Scale(options) override defaults', () => {
    const s = new Scale({
      tickCount: 20,
      domain: [0, 10],
    });

    //@ts-ignore
    expect(s.options.tickCount).toBe(20);
    //@ts-ignore
    expect(s.options.domain).toEqual([0, 10]);
  });

  test('getOptions(key) return corresponding value if key is valid', () => {
    const s = new Scale();
    expect(s.getOptions('tickCount')).toEqual(5);
    expect(s.getOptions('domain')).toEqual([0, 1]);
  });

  test('getOptions(key) return the total options if key is not valid', () => {
    const s = new Scale();
    //@ts-ignore
    expect(s.options).toEqual(s.getOptions());
  });

  test('update(options) update options', () => {
    const s = new Scale();

    s.update({
      tickCount: 10,
      domain: [0, 10],
    });

    expect(s.getOptions('tickCount')).toBe(10);
    expect(s.getOptions('domain')).toEqual([0, 10]);
  });

  test('getTicks() call options.tickMethod and return its return value', () => {
    const s = new Scale();
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

  test('clone() return a scale belong to same class', () => {
    const s = new Scale();
    const s1 = s.clone();
    expect(s1).toBeInstanceOf(Scale);
  });

  test('clone() return a scale with the same options as the original one', () => {
    const s = new Scale();
    const s1 = s.clone();
    expect(s.getOptions()).toEqual(s1.getOptions());
  });

  test('clone() return a scale isolating change with the original one', () => {
    const s = new Scale();
    const s1 = s.clone();

    s.update({
      tickCount: 20,
      domain: [0, 100],
    });
    expect(s1.getOptions('tickCount')).toBe(5);
    expect(s1.getOptions('domain')).toEqual([0, 1]);

    s1.update({
      tickCount: 10,
      domain: [0, 10],
    });
    expect(s.getOptions('tickCount')).toBe(20);
    expect(s.getOptions('domain')).toEqual([0, 100]);
  });
});
