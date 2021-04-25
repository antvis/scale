import { TimeFloorMap } from './time-floor';

export function chooseNiceTimeMask(date: Date, floorMap: TimeFloorMap): string {
  const { second, minute, hour, day, week, month, year } = floorMap;
  if (second(date) < date) return '.SSS';
  if (minute(date) < date) return ':ss';
  if (hour(date) < date) return 'hh:mm';
  if (day(date) < date) return 'hh A';
  if (month(date) < date) {
    if (week(date) < date) return 'MMM DD';
    return 'ddd DD';
  }
  if (year(date) < date) return 'MMMM';
  return 'YYYY';
}
