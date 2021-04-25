import { isValid } from '../../../src/utils/is-valid';

describe('isValid', () => {
  test('undefined, NaN, null is not valid', () => {
    expect(isValid(0)).toBe(true);
    expect(isValid('')).toBe(true);
    expect(isValid([])).toBe(true);
    expect(isValid(undefined)).toBe(false);
    expect(isValid(NaN)).toBe(false);
    expect(isValid(null)).toBe(false);
  });
});
