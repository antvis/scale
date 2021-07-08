import { prettyNumber } from '../../../src/utils/pretty-number';

describe('prettyNumber', () => {
  test('prettyNumber number', () => {
    expect(prettyNumber(1e-16)).toBe(1e-16);
    expect(prettyNumber(0.09999999999999998)).toBe(0.1);
    expect(prettyNumber(0.1 + 0.2)).toBe(0.3);
    expect(prettyNumber(-1e-16)).toBe(-1e-16);
    expect(prettyNumber(-0.09999999999999998)).toBe(-0.1);
    expect(prettyNumber(-(0.1 + 0.2))).toBe(-0.3);
  });
});
