import interval from '../../../src/util/interval';

describe('test interval ticks', () => {
  it('0, 100', () => {
    expect(interval(0, 100, 10).ticks).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    expect(interval(0, 100, 20).ticks).toEqual([0,  20,  40,  60,  80,  100]);
    expect(interval(0, 100, 25).ticks).toEqual([0, 25, 50, 75, 100]);
    expect(interval(0, 100, 30).ticks).toEqual([0, 30, 60, 90, 120]);
  });
  it('3, 97', () => {
    expect(interval(3, 97, 10).ticks).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    expect(interval(3, 97, 20).ticks).toEqual([0,  20,  40,  60,  80,  100]);
    expect(interval(3, 97, 25).ticks).toEqual([0, 25, 50, 75, 100]);
    expect(interval(3, 97, 30).ticks).toEqual([0, 30, 60, 90, 120]);
  });
  it('interval 0.5', () => {
    expect(interval(0, 3.2, 0.5).ticks).toEqual([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5]);
  });

  it('interval 3.3', () => {
    expect(interval(2, 9, 3.3).ticks).toEqual([0, 3.3, 6.6, 9.9]);
  });
});