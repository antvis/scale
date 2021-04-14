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

  test('test clone method', () => {
    const scale = new Point({
      domain: ['A', 'B', 'C'],
      range: [0, 500],
    });
    const newScale = scale.clone();
    expect(scale.getOptions()).toStrictEqual(newScale.getOptions());
    expect(scale.getOptions().domain !== newScale.getOptions().domain).toBeTruthy();
  });
});
