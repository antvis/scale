import { createClamp } from '../../src/utils';

describe('createClamp', () => {
  test('createClamp(lo, hi) returns a clamp function', () => {
    const clamp = createClamp(5, 10);
    expect(clamp(2)).toBe(5);
    expect(clamp(12)).toBe(10);
  });

  test('createClamp(hi, lo) exchange hi, lo', () => {
    const clamp = createClamp(10, 5);
    expect(clamp(2)).toBe(5);
    expect(clamp(12)).toBe(10);
  });
});
