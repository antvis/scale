import { timeFloorMap, chooseNiceTimeMask } from '../../../src/utils';

describe('chooseNiceTimeMask', () => {
  test('chooseNiceTimeMask(date, timeFloorMap) formats milliseconds', () => {
    const date = new Date(2021, 11, 31, 23, 59, 59, 999);
    expect(chooseNiceTimeMask(date, timeFloorMap)).toBe('.SSS');
  });

  test('chooseNiceTimeMask(date, timeFloorMap) formats seconds', () => {
    const date = new Date(2021, 11, 31, 23, 59, 59);
    expect(chooseNiceTimeMask(date, timeFloorMap)).toBe(':ss');
  });

  test('chooseNiceTimeMask(date, timeFloorMap) formats minutes', () => {
    const date = new Date(2021, 11, 31, 23, 59);
    expect(chooseNiceTimeMask(date, timeFloorMap)).toBe('hh:mm');
  });

  test('chooseNiceTimeMask(date, timeFloorMap) formats hours', () => {
    const date = new Date(2021, 11, 31, 23);
    expect(chooseNiceTimeMask(date, timeFloorMap)).toBe('hh A');
  });

  test('chooseNiceTimeMask(date, timeFloorMap) formats days', () => {
    const date = new Date(2021, 3, 26);
    expect(chooseNiceTimeMask(date, timeFloorMap)).toBe('MMM DD');
  });

  test('chooseNiceTimeMask(date, timeFloorMap) formats weeks', () => {
    const date = new Date(2021, 3, 25);
    expect(chooseNiceTimeMask(date, timeFloorMap)).toBe('ddd DD');
  });

  test('chooseNiceTimeMask(date, timeFloorMap) formats month', () => {
    const date = new Date(2021, 3);
    expect(chooseNiceTimeMask(date, timeFloorMap)).toBe('MMMM');
  });

  test('chooseNiceTimeMask(date, timeFloorMap) formats year', () => {
    const date = new Date(2021, 0);
    expect(chooseNiceTimeMask(date, timeFloorMap)).toBe('YYYY');
  });
});
