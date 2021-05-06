import {
  Interval,
  createInterval,
  IntervalMap,
  DURATION_SECOND,
  DURATION_MINUTE,
  DURATION_HOUR,
  DURATION_DAY,
  DURATION_WEEK,
  DURATION_MONTH,
  DURATION_YEAR,
} from './time-interval';

export const utcMillisecond: Interval = createInterval(
  (date) => date,
  (date, step = 1) => {
    date.setTime(+date + step);
  },
  1
);

export const utcSecond: Interval = createInterval(
  (date) => {
    date.setUTCMilliseconds(0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_SECOND * step);
  },
  DURATION_SECOND
);

export const utcMinute: Interval = createInterval(
  (date) => {
    date.setUTCSeconds(0, 0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_MINUTE * step);
  },
  DURATION_MINUTE
);

export const utcHour: Interval = createInterval(
  (date) => {
    date.setUTCMinutes(0, 0, 0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_HOUR * step);
  },
  DURATION_HOUR
);

export const utcDay: Interval = createInterval(
  (date) => {
    date.setUTCHours(0, 0, 0, 0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_DAY * step);
  },
  DURATION_DAY
);

export const utcWeek: Interval = createInterval(
  (date) => {
    date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 7) % 7));
    date.setUTCHours(0, 0, 0, 0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_WEEK * step);
  },
  DURATION_WEEK
);

export const utcMonth: Interval = createInterval(
  (date) => {
    date.setUTCDate(1);
    date.setUTCHours(0, 0, 0, 0);
  },
  (date, step = 1) => {
    const month = date.getUTCMonth();
    date.setUTCMonth(month + step);
  },
  DURATION_MONTH
);

export const utcYear: Interval = createInterval(
  (date) => {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  },
  (date, step = 1) => {
    const year = date.getUTCFullYear();
    date.setUTCFullYear(year + step);
  },
  DURATION_YEAR
);

export const utcIntervalMap: IntervalMap = {
  millisecond: utcMillisecond,
  second: utcSecond,
  minute: utcMinute,
  hour: utcHour,
  day: utcDay,
  week: utcWeek,
  month: utcMonth,
  year: utcYear,
};
