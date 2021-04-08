import { compose } from '../../src/utils';

describe('compose', () => {
  test('compose(fn) returns fn', () => {
    const fn1 = (x: string) => `fn1(${x})`;
    expect(compose(fn1)('x')).toBe('fn1(x)');
  });

  test('compose(fn1, fn2, fn3) composes functions', () => {
    const fn1 = (x: string) => `fn1(${x})`;
    const fn2 = (x: string) => `fn2(${x})`;
    const fn3 = (x: string) => `fn3(${x})`;
    expect(compose(fn1, fn2, fn3)('x')).toBe('fn1(fn2(fn3(x)))');
  });
});
