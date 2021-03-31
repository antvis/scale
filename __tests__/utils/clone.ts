import Base from '../../src/scales/base';
import { BaseOptions } from '../../src/types';

export default function testClone(Scale: new () => Base<BaseOptions>) {
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
    });
    expect(s1.getOptions().tickCount).toBe(5);

    s1.update({
      tickCount: 30,
    });
    expect(s.getOptions().tickCount).toBe(20);
  });
}
