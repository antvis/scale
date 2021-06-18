import { getTickMethod } from '../../../src/tick-method/index';

describe('test quantile test', () => {
  const quantile = getTickMethod('quantile');
  it('init', () => {
    expect(quantile).not.toBe(undefined);
  });
  
  it('no values', () => {
    expect(quantile({})).toEqual([]);
    expect(quantile({values: []})).toEqual([]);
  });

  it('tick count 2', () => {
    const ticks = quantile({
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tickCount: 2
    });
    expect(ticks).toEqual([0, 10]);
  });

  it('tick count 3', () => {
    const ticks = quantile({
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tickCount: 3
    });
    expect(ticks).toEqual([0, 5, 10]);
  });

  it('tick count 4', () => {
    const ticks = quantile({
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tickCount: 4
    });
    expect(ticks).toEqual([0, 3, 7, 10]);
  });

  it('tick count 5', () => {
    const ticks = quantile({
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tickCount: 5
    });
    expect(ticks).toEqual([0, 2, 5, 8, 10]);
  });

  it('tick count 10', () => {
    const values = [];
    for(let i = 0; i <= 100; i++) {
      values.push(i);
    }
    const ticks = quantile({
      values,
      tickCount: 11
    });
    expect(ticks).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  it('random values', () => {
    const values = [];
    for(let i = 0; i <= 10000; i++) {
      values.push(Math.random() * 100);
    }
    const ticks = quantile({
      values,
      tickCount: 11
    });
    // 从概率上说，随机分布会均匀分布在 0，100 之间，所以每个 十分位的数值都正好是 10 的倍数
    expect(ticks[5]).toBeGreaterThan(48);
    expect(ticks[5]).toBeLessThan(52);
  });
});