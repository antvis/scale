import { createQuartile as fn } from '../../../src/utils/create-quartile';

describe('test create-quartile fn', () => {
  test('test unsorted data, we call array.prototype.sort()', () => {
    expect(fn([6, 9, 9, 1, 2, 2, 5], 4)).toStrictEqual([2, 5, 9]);
  });

  test('the position are integers', () => {
    // expect(fn([1, 2, 2, 5, 6, 9, 9], 4)).toStrictEqual([2, 5, 9]);
    expect(fn([0, 1, 8, 10], 4)).toStrictEqual([2, 5, 9]);
  });
});
