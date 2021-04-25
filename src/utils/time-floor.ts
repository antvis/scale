export type Floor = (d: Date) => Date;

export type TimeFloorMap = {
  millisecond: Floor;
  second: Floor;
  minute: Floor;
  hour: Floor;
  day: Floor;
  week: Floor;
  month: Floor;
  year: Floor;
};

export const millisecond: Floor = (d) => d;

export const second: Floor = (d) => new Date(d.setMilliseconds(0));

export const minute: Floor = (d) => new Date(d.setSeconds(0, 0));

export const hour: Floor = (d) => new Date(d.setMinutes(0, 0, 0));

export const day: Floor = (d) => new Date(d.setHours(0, 0, 0, 0));

export const week: Floor = (d) => {
  d.setDate(d.getDate() - (d.getDay() % 7));
  d.setHours(0, 0, 0, 0);
  return d;
};

export const month: Floor = (d) => {
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const year: Floor = (d) => {
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const timeFloorMap: TimeFloorMap = {
  millisecond,
  second,
  minute,
  hour,
  day,
  week,
  month,
  year,
};
