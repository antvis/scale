import { sequence } from '../../../src/utils/sequence';

describe('sequence util test', () => {
  test('Both the first term and the last term are greater than or equal to 0', () => {
    expect(sequence(0, 100, 20)).toStrictEqual([0, 20, 40, 60, 80]);
  });

  test('Both the first term and the last term are less than or equal to 0', () => {
    expect(sequence(-100, 0, 30)).toStrictEqual([-100, -70, -40, -10]);
    expect(sequence(-100, -10, 20)).toStrictEqual([-100, -80, -60, -40, -20]);
  });

  test('The last item is less than the first item, but the tolerance is greater than 0, we return an empty array', () => {
    expect(sequence(-100, -200, 50)).toStrictEqual([]);
  });

  test('Tolerance is equal to 0', () => {
    expect(sequence(-100, -200, 0)).toStrictEqual([]);
  });

  test('The last term is equal to the first term', () => {
    expect(sequence(0, 0, 1000)).toStrictEqual([]);
  });
});
