import {
  DURATION_SECOND,
  DURATION_MINUTE,
  DURATION_HOUR,
  DURATION_DAY,
  DURATION_WEEK,
  DURATION_MONTH,
  DURATION_YEAR,
} from '../../../src/utils';

describe('time duration', () => {
  test('time durations equal expects', () => {
    expect(DURATION_SECOND).toBe(1000);
    expect(DURATION_MINUTE).toBe(DURATION_SECOND * 60);
    expect(DURATION_HOUR).toBe(DURATION_MINUTE * 60);
    expect(DURATION_DAY).toBe(DURATION_HOUR * 24);
    expect(DURATION_WEEK).toBe(DURATION_DAY * 7);
    expect(DURATION_MONTH).toBe(DURATION_DAY * 30);
    expect(DURATION_YEAR).toBe(DURATION_DAY * 365);
  });
});
