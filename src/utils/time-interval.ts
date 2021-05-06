export type TimeTransform = (d: Date, ...rest: any[]) => Date;
type TimeRange = (start: Date, stop: Date, step: number) => Date[];
type TimeProcess = (d: Date, ...rest: any[]) => void;

export const DURATION_SECOND = 1000;
export const DURATION_MINUTE = DURATION_SECOND * 60;
export const DURATION_HOUR = DURATION_MINUTE * 60;
export const DURATION_DAY = DURATION_HOUR * 24;
export const DURATION_WEEK = DURATION_DAY * 7;
export const DURATION_MONTH = DURATION_DAY * 30;
export const DURATION_YEAR = DURATION_DAY * 365;

export type Interval = {
  floor: TimeTransform;
  ceil: TimeTransform;
  range: TimeRange;
  duration: number;
};

export type IntervalMap = {
  millisecond: Interval;
  second: Interval;
  minute: Interval;
  hour: Interval;
  day: Interval;
  week: Interval;
  month: Interval;
  year: Interval;
};

export function createInterval(floori: TimeProcess, offseti: TimeProcess, duration: number) {
  const floor: TimeTransform = (date) => {
    const d = new Date(+date);
    floori(d);
    return d;
  };

  const ceil: TimeTransform = (date) => {
    const d = new Date(+date - 1);
    floori(d);
    offseti(d);
    floori(d);
    return d;
  };

  const range = (start: Date, stop: Date, step: number) => {
    const ticks = [];
    for (let t = ceil(start); t.getTime() < stop.getTime(); offseti(t, step), floori(t)) {
      ticks.push(new Date(+t));
    }
    return ticks;
  };

  return {
    ceil,
    floor,
    range,
    duration,
  };
}

export const millisecond: Interval = createInterval(
  (date) => date,
  (date, step = 1) => {
    date.setTime(+date + step);
  },
  1
);

export const second: Interval = createInterval(
  (date) => {
    date.setMilliseconds(0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_SECOND * step);
  },
  DURATION_SECOND
);

export const minute: Interval = createInterval(
  (date) => {
    date.setSeconds(0, 0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_MINUTE * step);
  },
  DURATION_MINUTE
);

export const hour: Interval = createInterval(
  (date) => {
    date.setMinutes(0, 0, 0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_HOUR * step);
  },
  DURATION_HOUR
);

export const day: Interval = createInterval(
  (date) => {
    date.setHours(0, 0, 0, 0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_DAY * step);
  },
  DURATION_DAY
);

export const week: Interval = createInterval(
  (date) => {
    date.setDate(date.getDate() - (date.getDay() % 7));
    date.setHours(0, 0, 0, 0);
  },
  (date, step = 1) => {
    date.setTime(+date + DURATION_WEEK * step);
  },
  DURATION_WEEK
);

export const month: Interval = createInterval(
  (date) => {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
  },
  (date, step = 1) => {
    const month = date.getMonth();
    date.setMonth(month + step);
  },
  DURATION_MONTH
);

export const year: Interval = createInterval(
  (date) => {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  },
  (date, step = 1) => {
    const year = date.getFullYear();
    date.setFullYear(year + step);
  },
  DURATION_YEAR
);

export const localIntervalMap: IntervalMap = {
  millisecond,
  second,
  minute,
  hour,
  day,
  week,
  month,
  year,
};
