import { millisecond, second, minute, hour, day, week, month, year, timeFloorMap } from '../../../src/utils';

describe('time floor', () => {
  test('timeFloorMap has expected defaults', () => {
    expect(timeFloorMap.millisecond).toEqual(millisecond);
    expect(timeFloorMap.second).toEqual(second);
    expect(timeFloorMap.minute).toEqual(minute);
    expect(timeFloorMap.hour).toEqual(hour);
    expect(timeFloorMap.day).toEqual(day);
    expect(timeFloorMap.week).toEqual(week);
    expect(timeFloorMap.month).toEqual(month);
    expect(timeFloorMap.year).toEqual(year);
  });

  test('millisecond(date) returns milliseconds', () => {
    expect(millisecond(new Date(2021, 11, 31, 23, 59, 59))).toEqual(new Date(2021, 11, 31, 23, 59, 59));
    expect(millisecond(new Date(2020, 11, 31, 23, 59, 59))).toEqual(new Date(2020, 11, 31, 23, 59, 59));
    expect(millisecond(new Date(2019, 11, 31, 23, 59, 59))).toEqual(new Date(2019, 11, 31, 23, 59, 59));
  });

  test('second(date) return seconds', () => {
    expect(second(new Date(2021, 11, 31, 23, 59, 59, 999))).toEqual(new Date(2021, 11, 31, 23, 59, 59));
    expect(second(new Date(2021, 0, 1, 0, 0, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));
    expect(second(new Date(2021, 0, 1, 0, 0, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));
  });

  test('minute(date) return minutes', () => {
    expect(minute(new Date(2021, 11, 31, 23, 59, 59))).toEqual(new Date(2021, 11, 31, 23, 59));
    expect(minute(new Date(2021, 0, 1, 0, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0, 0));
    expect(minute(new Date(2021, 0, 1, 0, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0, 0));
  });

  test('hour(date) return hours', () => {
    expect(hour(new Date(2021, 11, 31, 23, 59))).toEqual(new Date(2021, 11, 31, 23));
    expect(hour(new Date(2021, 0, 1, 0, 0))).toEqual(new Date(2021, 0, 1, 0, 0));
    expect(hour(new Date(2021, 0, 1, 0, 1))).toEqual(new Date(2021, 0, 1, 0, 0));
  });

  test('day(date) return days', () => {
    expect(day(new Date(2021, 3, 25, 23))).toEqual(new Date(2021, 3, 25));
    expect(day(new Date(2021, 3, 25))).toEqual(new Date(2021, 3, 25));
    expect(day(new Date(2021, 3, 25, 1))).toEqual(new Date(2021, 3, 25));
  });

  test('week(date) return weeks', () => {
    expect(week(new Date(2021, 3, 24))).toEqual(new Date(2021, 3, 18));
    expect(week(new Date(2021, 3, 25))).toEqual(new Date(2021, 3, 25));
    expect(week(new Date(2021, 3, 26))).toEqual(new Date(2021, 3, 25));
  });

  test('month(date) return month', () => {
    expect(month(new Date(2021, 0, 31))).toEqual(new Date(2021, 0));
    expect(month(new Date(2021, 1, 1))).toEqual(new Date(2021, 1));
    expect(month(new Date(2021, 1, 2))).toEqual(new Date(2021, 1));
  });

  test('year(date) return weeks', () => {
    expect(year(new Date(2021, 0))).toEqual(new Date(2021, 0));
    expect(year(new Date(2021, 3))).toEqual(new Date(2021, 0));
    expect(year(new Date(2021, 11))).toEqual(new Date(2021, 0));
  });
});
