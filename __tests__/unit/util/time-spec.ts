
import { DAY, getTickInterval, MONTH, toTimeStamp } from '../../../src/util/time';

describe('test time util', () => {
  it('to time stamp', () => {
    const string = '2020-01-10T06:40:13.774Z';
    expect(toTimeStamp(string)).toBe(new Date(string).getTime());
    const now = Date.now();
    expect(toTimeStamp(now)).toBe(now);
    const date = new Date();
    expect(date.getTime()).toBe(toTimeStamp(date));
    expect(toTimeStamp('2010-01-02')).toBe(toTimeStamp('2010/01/02'));
  });
  it('get interval seconds', () => {
    const min = toTimeStamp('2020-01-10 00:00:00');
    const max = toTimeStamp('2020-01-10 00:00:20');
    const max1 = toTimeStamp('2020-01-10 00:00:40');
    expect(getTickInterval(min, max, 10)[1]).toBe(1000);
    expect(getTickInterval(min, max, 30)[1]).toBe(1000);
    expect(getTickInterval(min, max1, 3)[1]).toBe(10000);
  });

  it('get interval year', () => {
    const min = toTimeStamp('2020-01-10');
    const max = toTimeStamp('2030-01-10');
    expect(getTickInterval(min, max, 5)[1]).toBe(DAY * 380);
    expect(getTickInterval(min, max, 30)[1]).toBe(MONTH);
  });
});