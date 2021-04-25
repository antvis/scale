import { Floor, TimeFloorMap } from './time-floor';

export const utcMillisecond: Floor = (d) => d;

export const utcSecond: Floor = (d) => new Date(d.setUTCMilliseconds(0));

export const utcMinute: Floor = (d) => new Date(d.setUTCSeconds(0, 0));

export const utcHour: Floor = (d) => new Date(d.setUTCMinutes(0, 0, 0));

export const utcDay: Floor = (d) => new Date(d.setUTCHours(0, 0, 0, 0));

export const utcWeek: Floor = (d) => {
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 7) % 7));
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const utcMonth: Floor = (d) => {
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const utcYear: Floor = (d) => {
  d.setUTCMonth(0, 1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const utcFloorMap: TimeFloorMap = {
  millisecond: utcMillisecond,
  second: utcSecond,
  minute: utcMinute,
  hour: utcHour,
  day: utcDay,
  week: utcWeek,
  month: utcMonth,
  year: utcYear,
};
