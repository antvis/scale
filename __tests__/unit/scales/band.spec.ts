import { Band } from '../../../src/scales/band';

describe('band scale', () => {
  test('default options', () => {
    const bandScale = new Band();
    const { domain, range, bandWidth, step, round, paddingInner, paddingOuter, align } = bandScale.getOptions();

    expect(domain).toStrictEqual([]);
    expect(range).toStrictEqual([0, 1]);
    expect(bandWidth).toStrictEqual(1);
    expect(step).toStrictEqual(1);
    expect(round).toStrictEqual(false);
    expect(paddingInner).toStrictEqual(0);
    expect(paddingOuter).toStrictEqual(0);
    expect(align).toStrictEqual(0.5);
  });

  test('test map fn', () => {
    const bandScale = new Band({
      domain: ['foo', 'bar'],
      range: [0, 960],
    });

    expect(bandScale.map('foo')).toStrictEqual(0);
    expect(bandScale.map('bar')).toStrictEqual(480);
  });
});
