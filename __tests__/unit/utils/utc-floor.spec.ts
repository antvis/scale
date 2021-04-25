import {
  utcMillisecond,
  utcSecond,
  utcMinute,
  utcHour,
  utcDay,
  utcWeek,
  utcMonth,
  utcYear,
  utcFloorMap,
} from '../../../src/utils';

function UTC(
  year: number,
  month: number,
  date: number = 1,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
  ms: number = 0
) {
  return new Date(Date.UTC(year, month, date, hours, minutes, seconds, ms));
}

describe('time floor', () => {
  test('utcFloorMap has expected defaults', () => {
    expect(utcFloorMap.millisecond).toEqual(utcMillisecond);
    expect(utcFloorMap.second).toEqual(utcSecond);
    expect(utcFloorMap.minute).toEqual(utcMinute);
    expect(utcFloorMap.hour).toEqual(utcHour);
    expect(utcFloorMap.day).toEqual(utcDay);
    expect(utcFloorMap.week).toEqual(utcWeek);
    expect(utcFloorMap.month).toEqual(utcMonth);
    expect(utcFloorMap.year).toEqual(utcYear);
  });

  test('utcMillisecond(date) returns milliseconds', () => {
    expect(utcMillisecond(UTC(2021, 11, 31, 23, 59, 59))).toEqual(UTC(2021, 11, 31, 23, 59, 59));
    expect(utcMillisecond(UTC(2020, 11, 31, 23, 59, 59))).toEqual(UTC(2020, 11, 31, 23, 59, 59));
    expect(utcMillisecond(UTC(2019, 11, 31, 23, 59, 59))).toEqual(UTC(2019, 11, 31, 23, 59, 59));
  });

  test('utcSecond(date) return seconds', () => {
    expect(utcSecond(UTC(2021, 11, 31, 23, 59, 59, 999))).toEqual(UTC(2021, 11, 31, 23, 59, 59));
    expect(utcSecond(UTC(2021, 0, 1, 0, 0, 0, 0))).toEqual(UTC(2021, 0, 1, 0, 0, 0, 0));
    expect(utcSecond(UTC(2021, 0, 1, 0, 0, 0, 1))).toEqual(UTC(2021, 0, 1, 0, 0, 0, 0));
  });

  test('utcMinute(date) return minutes', () => {
    expect(utcMinute(UTC(2021, 11, 31, 23, 59, 59))).toEqual(UTC(2021, 11, 31, 23, 59));
    expect(utcMinute(UTC(2021, 0, 1, 0, 0, 0))).toEqual(UTC(2021, 0, 1, 0, 0, 0));
    expect(utcMinute(UTC(2021, 0, 1, 0, 0, 1))).toEqual(UTC(2021, 0, 1, 0, 0, 0));
  });

  test('utcHour(date) return hours', () => {
    expect(utcHour(UTC(2021, 11, 31, 23, 59))).toEqual(UTC(2021, 11, 31, 23));
    expect(utcHour(UTC(2021, 0, 1, 0, 0))).toEqual(UTC(2021, 0, 1, 0, 0));
    expect(utcHour(UTC(2021, 0, 1, 0, 1))).toEqual(UTC(2021, 0, 1, 0, 0));
  });

  test('utcDay(date) return days', () => {
    expect(utcDay(UTC(2021, 3, 25, 23))).toEqual(UTC(2021, 3, 25));
    expect(utcDay(UTC(2021, 3, 25))).toEqual(UTC(2021, 3, 25));
    expect(utcDay(UTC(2021, 3, 25, 1))).toEqual(UTC(2021, 3, 25));
  });

  test('utcWeek(date) return weeks', () => {
    expect(utcWeek(UTC(2021, 3, 24))).toEqual(UTC(2021, 3, 18));
    expect(utcWeek(UTC(2021, 3, 25))).toEqual(UTC(2021, 3, 25));
    expect(utcWeek(UTC(2021, 3, 26))).toEqual(UTC(2021, 3, 25));
  });

  test('utcMonth(date) return month', () => {
    expect(utcMonth(UTC(2021, 0, 31))).toEqual(UTC(2021, 0));
    expect(utcMonth(UTC(2021, 1, 1))).toEqual(UTC(2021, 1));
    expect(utcMonth(UTC(2021, 1, 2))).toEqual(UTC(2021, 1));
  });

  test('utcYear(date) return weeks', () => {
    expect(utcYear(UTC(2021, 0))).toEqual(UTC(2021, 0));
    expect(utcYear(UTC(2021, 3))).toEqual(UTC(2021, 0));
    expect(utcYear(UTC(2021, 11))).toEqual(UTC(2021, 0));
  });
});
