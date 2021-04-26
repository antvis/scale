import {
  utcMillisecond,
  utcSecond,
  utcMinute,
  utcHour,
  utcDay,
  utcWeek,
  utcMonth,
  utcYear,
  utcIntervalMap,
  DURATION_SECOND,
  DURATION_MINUTE,
  DURATION_HOUR,
  DURATION_DAY,
  DURATION_WEEK,
  DURATION_MONTH,
  DURATION_YEAR,
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
  test('utcIntervalMap has expected defaults', () => {
    expect(utcIntervalMap.millisecond).toEqual(utcMillisecond);
    expect(utcIntervalMap.second).toEqual(utcSecond);
    expect(utcIntervalMap.minute).toEqual(utcMinute);
    expect(utcIntervalMap.hour).toEqual(utcHour);
    expect(utcIntervalMap.day).toEqual(utcDay);
    expect(utcIntervalMap.week).toEqual(utcWeek);
    expect(utcIntervalMap.month).toEqual(utcMonth);
    expect(utcIntervalMap.year).toEqual(utcYear);
  });

  test('utcMillisecond(date) returns milliseconds', () => {
    expect(utcMillisecond.duration).toBe(1);

    expect(utcMillisecond.floor(UTC(2021, 11, 31, 23, 59, 59))).toEqual(UTC(2021, 11, 31, 23, 59, 59));
  });

  test('utcSecond(date) return seconds', () => {
    expect(utcSecond.duration).toBe(DURATION_SECOND);

    expect(utcSecond.floor(UTC(2021, 11, 31, 23, 59, 59, 999))).toEqual(UTC(2021, 11, 31, 23, 59, 59));
    expect(utcSecond.floor(UTC(2021, 0, 1, 0, 0, 0, 0))).toEqual(UTC(2021, 0, 1, 0, 0, 0, 0));
    expect(utcSecond.floor(UTC(2021, 0, 1, 0, 0, 0, 1))).toEqual(UTC(2021, 0, 1, 0, 0, 0, 0));
  });

  test('utcMinute(date) return minutes', () => {
    expect(utcMinute.duration).toBe(DURATION_MINUTE);

    expect(utcMinute.floor(UTC(2021, 11, 31, 23, 59, 59))).toEqual(UTC(2021, 11, 31, 23, 59));
    expect(utcMinute.floor(UTC(2021, 0, 1, 0, 0, 0))).toEqual(UTC(2021, 0, 1, 0, 0, 0));
    expect(utcMinute.floor(UTC(2021, 0, 1, 0, 0, 1))).toEqual(UTC(2021, 0, 1, 0, 0, 0));
  });

  test('utcHour(date) return hours', () => {
    expect(utcHour.duration).toBe(DURATION_HOUR);

    expect(utcHour.floor(UTC(2021, 11, 31, 23, 59))).toEqual(UTC(2021, 11, 31, 23));
    expect(utcHour.floor(UTC(2021, 0, 1, 0, 0))).toEqual(UTC(2021, 0, 1, 0, 0));
    expect(utcHour.floor(UTC(2021, 0, 1, 0, 1))).toEqual(UTC(2021, 0, 1, 0, 0));
  });

  test('utcDay(date) return days', () => {
    expect(utcDay.duration).toBe(DURATION_DAY);

    expect(utcDay.floor(UTC(2021, 3, 25, 23))).toEqual(UTC(2021, 3, 25));
    expect(utcDay.floor(UTC(2021, 3, 25))).toEqual(UTC(2021, 3, 25));
    expect(utcDay.floor(UTC(2021, 3, 25, 1))).toEqual(UTC(2021, 3, 25));
  });

  test('utcWeek(date) return weeks', () => {
    expect(utcWeek.duration).toBe(DURATION_WEEK);

    expect(utcWeek.floor(UTC(2021, 3, 24))).toEqual(UTC(2021, 3, 18));
    expect(utcWeek.floor(UTC(2021, 3, 25))).toEqual(UTC(2021, 3, 25));
    expect(utcWeek.floor(UTC(2021, 3, 26))).toEqual(UTC(2021, 3, 25));
  });

  test('utcMonth(date) return month', () => {
    expect(utcMonth.duration).toBe(DURATION_MONTH);

    expect(utcMonth.floor(UTC(2021, 0, 31))).toEqual(UTC(2021, 0));
    expect(utcMonth.floor(UTC(2021, 1, 1))).toEqual(UTC(2021, 1));
    expect(utcMonth.floor(UTC(2021, 1, 2))).toEqual(UTC(2021, 1));
  });

  test('utcYear(date) return weeks', () => {
    expect(utcYear.duration).toBe(DURATION_YEAR);

    expect(utcYear.floor(UTC(2021, 0))).toEqual(UTC(2021, 0));
    expect(utcYear.floor(UTC(2021, 3))).toEqual(UTC(2021, 0));
    expect(utcYear.floor(UTC(2021, 11))).toEqual(UTC(2021, 0));
  });
});
