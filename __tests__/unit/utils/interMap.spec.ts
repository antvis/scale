import { InternMap } from '../../../src/utils';

describe('create InternMap ', () => {
  test('create InternMap with key of string', () => {
    const internMap = new InternMap([
      [1, 'dog'],
      [2, 'cat'],
    ]);
    internMap.set(3, 'cow');
    expect(internMap.get(1)).toBe('dog');
    expect(internMap.get(3)).toBe('cow');

    internMap.set(1, 'mouse');
    expect(internMap.get(1)).toBe('mouse');

    internMap.delete(2);
    expect(internMap.has(2)).toBeFalsy();
  });

  test('create InternMap with key of object', () => {
    const time1 = new Date(Date.UTC(2022, 9, 5));
    const time2 = new Date(Date.UTC(2022, 9, 5));
    expect(time1 === time2).toBeFalsy();

    const internMap = new InternMap([
      [time1, 'time1'],
      [time2, 'time2'],
    ]);

    expect(internMap.get(time1)).toBe('time2');
  });
});
