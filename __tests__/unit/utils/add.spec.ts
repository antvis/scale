import { precisionAdd as fn } from '../../../src/utils/precision-add';

describe('test precisionAdd', () => {
  test('precisionAdd', () => {
    expect(fn(0.1, 0.2)).toStrictEqual(0.3);
    expect(fn(2.3, 2.4)).toStrictEqual(4.7);
    expect(fn(-1.6, -1)).toStrictEqual(-2.6);
    expect(fn(-2.0, 63)).toStrictEqual(61);
    expect(fn(-3, 0.2)).toStrictEqual(-2.8);
    expect(fn(1.3224e10, 1.3224e3)).toStrictEqual(13224001322.4);
    expect(fn(1.6e-30, 1.6e-30)).toStrictEqual(3.2e-30);
  });
});
