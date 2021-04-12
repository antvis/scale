import { createInterpolateRound, createInterpolate } from '../../../src/utils';

describe('interpolate', () => {
  test('createInterpolate(a, b) returns a linear interpolator', () => {
    const interpolate = createInterpolate(0, 10);

    expect(interpolate(0.1)).toBe(1);
    expect(interpolate(0.5)).toBe(5);
    expect(interpolate(0.95)).toBe(9.5);
  });

  test('createInterpolateRound(a, b) returns a linear interpolator with rounded output', () => {
    const interpolateRound = createInterpolateRound(0, 10);
    expect(interpolateRound(0.12)).toBe(1);
    expect(interpolateRound(0.14)).toBe(1);
    expect(interpolateRound(0.15)).toBe(2);
  });
});
