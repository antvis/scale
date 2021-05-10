import { d3Log } from '../../../src/tick-methods/d3-log';

function round(x: number) {
  return Math.round(x * 1e12) / 1e12;
}

describe('d3Log', () => {
  test('d3Log(a, b, n) generates the expected power-of-ten for ascending ticks', () => {
    expect(d3Log(1e-1, 1e1, 10).map(round)).toEqual([
      0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(d3Log(1e-1, 1, 10).map(round)).toEqual([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
    expect(d3Log(-1, -1e-1, 10).map(round)).toEqual([-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1]);
  });

  test('d3Log(a, b, n) generates the expected power-of-ten ticks for descending domains', () => {
    expect(d3Log(-1e-1, -1e1, 10).map(round)).toEqual(
      [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1].reverse()
    );
    expect(d3Log(-1e-1, -1, 10).map(round)).toEqual(
      [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1].reverse()
    );
    expect(d3Log(1, 1e-1, 10).map(round)).toEqual([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].reverse());
  });

  test('d3Log(a, b, n) generates the expected power-of-ten ticks for small domains', () => {
    expect(d3Log(1, 5, 10)).toEqual([1, 2, 3, 4, 5]);
    expect(d3Log(5, 1, 10)).toEqual([5, 4, 3, 2, 1]);
    expect(d3Log(-1, -5, 10)).toEqual([-1, -2, -3, -4, -5]);
    expect(d3Log(-5, -1, 10)).toEqual([-5, -4, -3, -2, -1]);
    expect(d3Log(286.9252014, 329.4978332, 1)).toEqual([300]);
    expect(d3Log(286.9252014, 329.4978332, 2)).toEqual([300]);
    expect(d3Log(286.9252014, 329.4978332, 3)).toEqual([300, 320]);
    expect(d3Log(286.9252014, 329.4978332, 4)).toEqual([290, 300, 310, 320]);
    expect(d3Log(286.9252014, 329.4978332, 10)).toEqual([290, 295, 300, 305, 310, 315, 320, 325]);
  });

  test('d3Log(a, b, n) generates linear ticks when the domain extent is small', () => {
    expect(d3Log(41, 42, 10)).toEqual([41, 41.1, 41.2, 41.3, 41.4, 41.5, 41.6, 41.7, 41.8, 41.9, 42]);
    expect(d3Log(42, 41, 10)).toEqual([42, 41.9, 41.8, 41.7, 41.6, 41.5, 41.4, 41.3, 41.2, 41.1, 41]);
    expect(d3Log(1600, 1400, 10)).toEqual([1600, 1580, 1560, 1540, 1520, 1500, 1480, 1460, 1440, 1420, 1400]);
  });

  test('d3Log(a, b, n, base) generates the expected power-of-base ticks', () => {
    expect(d3Log(0.1, 100, 10, Math.E).map(round)).toEqual([
      0.135335283237, 0.367879441171, 1, 2.718281828459, 7.389056098931, 20.085536923188, 54.598150033144,
    ]);
  });
});
