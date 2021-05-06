import { bisect } from '../../../src/utils';

/**
 * https://github.com/d3/d3-array/blob/master/test/bisect-test.js
 */
describe('bisect', () => {
  test('bisect(array, x) returns the index after the exact match', () => {
    const array = [1, 2, 3, 4];
    expect(bisect(array, 1)).toBe(1);
    expect(bisect(array, 2)).toBe(2);
    expect(bisect(array, 3)).toBe(3);
    expect(bisect(array, 4)).toBe(4);
  });

  test('bisect(array, x) returns the index after the last match', () => {
    const array = [1, 2, 3, 3, 4];
    expect(bisect(array, 1)).toBe(1);
    expect(bisect(array, 2)).toBe(2);
    expect(bisect(array, 3)).toBe(4);
    expect(bisect(array, 4)).toBe(5);
  });

  test('bisect(array, x) returns ths insertion point of a non-exact match', () => {
    const array = [1, 2, 3];
    expect(bisect(array, 0.5)).toBe(0);
    expect(bisect(array, 1.5)).toBe(1);
    expect(bisect(array, 2.5)).toBe(2);
  });

  test('bisectRight(array, value, lo) observes the specified lower bound', () => {
    const array = [1, 2, 3, 4, 5];
    expect(bisect(array, 0, 2)).toBe(2);
    expect(bisect(array, 1, 2)).toBe(2);
    expect(bisect(array, 3, 2)).toBe(3);
    expect(bisect(array, 4, 2)).toBe(4);
    expect(bisect(array, 5, 2)).toBe(5);
    expect(bisect(array, 6, 2)).toBe(5);
  });

  test('bisectRight(array, value, lo, hi) observes the specified bounds', () => {
    const array = [1, 2, 3, 4, 5];
    expect(bisect(array, 0, 2, 3)).toBe(2);
    expect(bisect(array, 1, 2, 3)).toBe(2);
    expect(bisect(array, 2, 2, 3)).toBe(2);
    expect(bisect(array, 3, 2, 3)).toBe(3);
    expect(bisect(array, 4, 2, 3)).toBe(3);
    expect(bisect(array, 5, 2, 3)).toBe(3);
    expect(bisect(array, 6, 2, 3)).toBe(3);
  });

  test('bisect(array, x, lo, hi, getter) uses custom getter', () => {
    const array = [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }];
    expect(bisect(array, 1, 0, array.length, (d) => d.v)).toBe(1);
    expect(bisect(array, 2, 0, array.length, (d) => d.v)).toBe(2);
    expect(bisect(array, 3, 0, array.length, (d) => d.v)).toBe(3);
    expect(bisect(array, 4, 0, array.length, (d) => d.v)).toBe(4);
  });
});
