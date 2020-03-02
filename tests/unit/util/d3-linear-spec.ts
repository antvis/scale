import d3Linear, { D3Linear } from '../../../src/util/d3-linear';

function roundEpsilon(x) {
  return Math.round(x * 1e12) / 1e12;
}

describe('D3Linear', () => {
  it('nice', () => {
    const linear = new D3Linear();
    expect((linear.domain([0, 0.96]) as D3Linear).nice().domain()).toEqual([0, 1]);
    expect((linear.domain([0, 96]) as D3Linear).nice().domain()).toEqual([0, 100]);

    expect((linear.domain([0.96, 0]) as D3Linear).nice(10).domain()).toEqual([1, 0]);
    expect((linear.domain([96, 0]) as D3Linear).nice(10).domain()).toEqual([100, 0]);
    expect((linear.domain([0, -0.96]) as D3Linear).nice().domain()).toEqual([0, -1]);
    expect((linear.domain([0, -96]) as D3Linear).nice().domain()).toEqual([0, -100]);
    expect((linear.domain([-0.96, 0]) as D3Linear).nice(10).domain()).toEqual([-1, 0]);
    expect((linear.domain([-96, 0]) as D3Linear).nice(10).domain()).toEqual([-100, 0]);
    expect((linear.domain([-0.1, 51.1]) as D3Linear).nice(8).domain()).toEqual([-10, 60]);

    expect((linear.domain([1.1, 10.9]) as D3Linear).nice(10).domain()).toEqual([1, 11]);
    expect((linear.domain([10.9, 1.1]) as D3Linear).nice(10).domain()).toEqual([11, 1]);
    expect((linear.domain([0.7, 11.001]) as D3Linear).nice(10).domain()).toEqual([0, 12]);
    expect((linear.domain([123.1, 6.7]) as D3Linear).nice(10).domain()).toEqual([130, 0]);
    expect((linear.domain([0, 0.49]) as D3Linear).nice(10).domain()).toEqual([0, 0.5]);
    expect((linear.domain([0, 14.1]) as D3Linear).nice(5).domain()).toEqual([0, 20]);
    expect((linear.domain([0, 15]) as D3Linear).nice(5).domain()).toEqual([0, 20]);

    expect((linear.domain([0, 0]) as D3Linear).nice(10).domain()).toEqual([0, 0]);
    expect((linear.domain([0.5, 0.5]) as D3Linear).nice(10).domain()).toEqual([0.5, 0.5]);

    expect((linear.domain([12, 87]) as D3Linear).nice(5).domain()).toEqual([0, 100]);
    expect((linear.domain([12, 87]) as D3Linear).nice(10).domain()).toEqual([10, 90]);
    expect((linear.domain([12, 87]) as D3Linear).nice(100).domain()).toEqual([12, 87]);
  });

  it('ticks ascending domain', () => {
    const linear = new D3Linear();
    expect(linear.ticks(10).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(linear.ticks(9).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(linear.ticks(8).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(linear.ticks(7).map(roundEpsilon)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    expect(linear.ticks(6).map(roundEpsilon)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    expect(linear.ticks(5).map(roundEpsilon)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    expect(linear.ticks(4).map(roundEpsilon)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    expect(linear.ticks(3).map(roundEpsilon)).toEqual([0.0, 0.5, 1.0]);
    expect(linear.ticks(2).map(roundEpsilon)).toEqual([0.0, 0.5, 1.0]);
    expect(linear.ticks(1).map(roundEpsilon)).toEqual([0.0, 1.0]);

    linear.domain([-100, 100]);
    expect(linear.ticks(10)).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
    expect(linear.ticks(9)).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
    expect(linear.ticks(8)).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
    expect(linear.ticks(7)).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
    expect(linear.ticks(6)).toEqual([-100, -50, 0, 50, 100]);
    expect(linear.ticks(5)).toEqual([-100, -50, 0, 50, 100]);
    expect(linear.ticks(4)).toEqual([-100, -50, 0, 50, 100]);
    expect(linear.ticks(3)).toEqual([-100, -50, 0, 50, 100]);
    expect(linear.ticks(2)).toEqual([-100, 0, 100]);
    expect(linear.ticks(1)).toEqual([0]);
  });

  it('ticks descending domain', () => {
    const linear = new D3Linear();
    expect(linear.ticks(10).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(linear.ticks(9).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(linear.ticks(8).map(roundEpsilon)).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(linear.ticks(7).map(roundEpsilon)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    expect(linear.ticks(6).map(roundEpsilon)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    expect(linear.ticks(5).map(roundEpsilon)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    expect(linear.ticks(4).map(roundEpsilon)).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
    expect(linear.ticks(3).map(roundEpsilon)).toEqual([0.0, 0.5, 1.0]);
    expect(linear.ticks(2).map(roundEpsilon)).toEqual([0.0, 0.5, 1.0]);
    expect(linear.ticks(1).map(roundEpsilon)).toEqual([0.0, 1.0]);

    linear.domain([-100, 100]);
    expect(linear.ticks(10)).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
    expect(linear.ticks(9)).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
    expect(linear.ticks(8)).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
    expect(linear.ticks(7)).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]);
    expect(linear.ticks(6)).toEqual([-100, -50, 0, 50, 100]);
    expect(linear.ticks(5)).toEqual([-100, -50, 0, 50, 100]);
    expect(linear.ticks(4)).toEqual([-100, -50, 0, 50, 100]);
    expect(linear.ticks(3)).toEqual([-100, -50, 0, 50, 100]);
    expect(linear.ticks(2)).toEqual([-100, 0, 100]);
    expect(linear.ticks(1)).toEqual([0]);
  });

  it('d3Linear entry', () => {
    expect(
      d3Linear({
        min: 0,
        max: 0.96,
      })
    ).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
    expect(
      d3Linear({
        min: 0,
        max: 0.96,
        tickCount: 5,
      })
    ).toEqual([0.0, 0.2, 0.4, 0.6, 0.8]);
    expect(
      d3Linear({
        min: 0,
        max: 0.96,
        nice: true,
      })
    ).toEqual([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
    expect(
      d3Linear({
        min: 0,
        max: 0.96,
        nice: true,
        tickCount: 5,
      })
    ).toEqual([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
  });
});
