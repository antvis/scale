import { sequence } from '../../../src/utils/sequence';

describe('sequence util test', () => {
  test('common case', () => {
    expect(sequence(0, 100, 20)).toStrictEqual([0, 20, 40, 60, 80]);
  });

  test('negative case', () => {
    expect(sequence(-100, 0, 30)).toStrictEqual([-100, -70, -40, -10]);
  });

  test('reverse case', () => {
    expect(sequence(-100, -200, 50)).toStrictEqual([]);
  });
});
