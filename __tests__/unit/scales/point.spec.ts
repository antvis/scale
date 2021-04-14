import { Point } from '../../../src/scales/point';

describe('point scale test', () => {
  test('test default options', () => {
    const scale = new Point();
    const { range, padding, align, domain } = scale.getOptions();

    expect(range).toStrictEqual([0, 1]);
    expect(padding).toStrictEqual(0);
    expect(align).toStrictEqual(0.5);
    expect(domain).toStrictEqual([]);
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

  test('clone() returns a Threshold scale with same and independent options ', () => {
    const x1 = new Point();
    const x2 = x1.clone();

    expect(x2).toBeInstanceOf(Point);
    expect(x1.getOptions()).toEqual(x2.getOptions());
    expect(x1.getOptions() !== x2.getOptions()).toBeTruthy();
  });
});
