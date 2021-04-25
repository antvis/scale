import { Base } from '../../../src/scales/base';
import { BaseOptions, Domain, Range } from '../../../src/types';

class Scale extends Base<BaseOptions> {
  protected getDefaultOptions() {
    return {
      domain: [0, 1],
      range: [0, 1],
    };
  }

  public map(x: Domain<BaseOptions>) {
    return x;
  }

  public invert(x: Range<BaseOptions>) {
    return x;
  }

  public clone() {
    return new Scale(this.options);
  }
}

describe('Base', () => {
  test('Scale() has expected defaults', () => {
    const s = new Scale();
    // @ts-ignore
    expect(s.options).toEqual({
      domain: [0, 1],
      range: [0, 1],
    });
  });

  test('Scale(options) override defaults', () => {
    const s = new Scale({
      domain: [0, 10],
    });

    // @ts-ignore
    expect(s.options.domain).toEqual([0, 10]);
  });

  test('getOptions() return current and independent Options', () => {
    const s = new Scale();
    const options = s.getOptions();
    // @ts-ignore
    expect(s.options).toEqual(options);

    const { domain } = options;
    domain[0] = -1;
    expect(s.getOptions().domain).toEqual([0, 1]);
  });

  test('update(options) update options', () => {
    const s = new Scale();

    s.update({
      domain: [0, 10],
    });

    const options = s.getOptions();
    expect(options.domain).toEqual([0, 10]);
  });

  test('clone() returns a scale belong to same class', () => {
    const s = new Scale();
    const s1 = s.clone();
    expect(s1).toBeInstanceOf(Scale);
  });

  test('clone() returns a scale with the same options as the original one', () => {
    const s = new Scale();
    const s1 = s.clone();
    expect(s.getOptions()).toEqual(s1.getOptions());
  });

  test('clone() returns a scale isolating change with the original one', () => {
    const s = new Scale();
    const s1 = s.clone();

    s.update({
      domain: [0, 10],
    });
    expect(s1.getOptions().domain).toEqual([0, 1]);

    s1.update({
      domain: [0, 100],
    });
    expect(s.getOptions().domain).toEqual([0, 10]);
  });
});
