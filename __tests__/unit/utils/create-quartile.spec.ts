import { createQuartile as fn } from '../../../src/utils/create-quartile';

describe('test create-quartile fn', () => {
  test('test unsorted data, we call array.prototype.sort()', () => {
    expect(fn([6, 9, 9, 1, 2, 2, 5], 4, false)).toStrictEqual([2, 5, 7.5]);
  });

  test('the position are integers', () => {
    expect(fn([1, 2, 2, 5, 6, 9, 9], 4, true)).toStrictEqual([2, 5, 7.5]);
    expect(fn([0, 1, 8, 10], 4)).toStrictEqual([0.75, 4.5, 8.5]);
  });

  test('test double number', () => {
    const res = fn([1.4, 2.8, 22, 125.4, 200, 210, 250], 4);
    expect(res[0]).toBeCloseTo(12.4, 2);
    expect(res[1]).toStrictEqual(125.4);
    expect(res[2]).toStrictEqual(205);
  });

  test('test negative data', () => {
    const res = fn([-200, -10, 22, 125.4, 200, 210], 4);
    expect(res).toStrictEqual([-2, 73.7, 181.35]);
  });

  test('test data when size < 2', () => {
    expect(fn([1], 3)).toStrictEqual([1, 1]);
    expect(fn([], 3)).toStrictEqual([undefined, undefined]);
  });
});
