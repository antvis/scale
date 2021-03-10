
import { isNumberEqual } from '@antv/util';
import { calBase, getLogPositiveMin, log } from '../../../src/util/math';

describe('test math util', () => {
  it('log', () => {
    expect(log(2, 4)).toBe(2);
    expect(isNumberEqual(log(3, 9), 2)).toBe(true);
  });
  it('calBase', () => {
    expect(calBase(2, 100)).toBe(10);
    expect(isNumberEqual(calBase(4, 16), 2)).toBe(true);
  });
  it('log min', () => {
    const arr = [-1, 0, 1, 5, 10, 2, 3, 0.2];
    expect(getLogPositiveMin(arr,1)).toBe(0.2);
    expect(getLogPositiveMin(arr,10)).toBe(0.2);
    expect(getLogPositiveMin([10],10)).toBe(1);
  });
});