import { createNormalize } from '../../../src/utils/normalize';

describe('createNormalize(a, b)', () => {
  test('createNormalize(a, a) returns a constant function of 0.5', () => {
    const normalize0 = createNormalize(0, 0);
    const normalize1 = createNormalize(1, 1);
    expect(normalize0(0)).toBe(0.5);
    expect(normalize1(1)).toBe(0.5);
  });

  test('createNormalize(a, b) returns a normalize function', () => {
    const normalize0 = createNormalize(0, 100);
    expect(normalize0(10)).toBe(0.1);
    expect(normalize0(50)).toBe(0.5);
    expect(normalize0(80)).toBe(0.8);
  });
});
