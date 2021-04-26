import { d3Time } from '../../../src/tick-methods/d3-time';

describe('d3Time', () => {
  test('d3Time uses d3Linear right now', () => {
    const [start, end] = [0, 1000];
    const ticks = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    const date = (d: number) => new Date(d * 1000);
    expect(d3Time(date(start), date(end), 10)).toEqual(ticks.map(date));
  });
});
