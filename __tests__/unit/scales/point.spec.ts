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
});
