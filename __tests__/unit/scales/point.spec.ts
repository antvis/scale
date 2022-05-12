import { Point } from '../../../src';

describe('point scale test', () => {
  test('test default options', () => {
    const scale = new Point();
    const { range, padding, align, domain, paddingInner } = scale.getOptions();

    expect(range).toStrictEqual([0, 1]);
    expect(padding).toStrictEqual(0);
    expect(align).toStrictEqual(0.5);
    expect(domain).toStrictEqual([]);
    expect(paddingInner).toStrictEqual(1);
  });

  test('test update', () => {
    const scale = new Point();

    scale.update({ domain: ['A', 'B'] });
    expect(scale.getOptions().domain).toEqual(['A', 'B']);
  });

  test('test common usage', () => {
    const scale = new Point({
      domain: ['A', 'B', 'C'],
      padding: 0.6,
      align: 1,
      range: [0, 500],
    });

    expect(scale.map('A')).toStrictEqual(187.5);
    expect(scale.getStep()).toStrictEqual(156.25);
    expect(scale.getBandWidth()).toStrictEqual(0);
  });

  test('test options.paddingInner always equals to 1', () => {
    const scale = new Point({
      // @ts-ignore
      paddingInner: 0,
      domain: ['A', 'B', 'C'],
      padding: 0.6,
      align: 1,
      range: [0, 500],
    });
    expect(scale.map('A')).toStrictEqual(187.5);
    expect(scale.getStep()).toStrictEqual(156.25);
    expect(scale.getBandWidth()).toStrictEqual(0);
  });

  test('clone() returns a Point scale with same and independent options', () => {
    const x1 = new Point();
    const x2 = x1.clone();

    expect(x2).toBeInstanceOf(Point);
    expect(x1.getOptions()).toEqual(x2.getOptions());
    expect(x1.getOptions() !== x2.getOptions()).toBeTruthy();
  });
});
