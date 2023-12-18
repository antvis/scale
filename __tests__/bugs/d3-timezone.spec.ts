import { d3Time } from '../../src';

test('d3Time(1698796800000, 1701302400000, 5)', () => {
  const ticks = d3Time(new Date(1698796800000), new Date(1701302400000), 5);
  expect(ticks).toEqual([
    new Date('2023-11-04T23:00:00.000Z'),
    new Date('2023-11-11T23:00:00.000Z'),
    new Date('2023-11-18T23:00:00.000Z'),
    new Date('2023-11-25T23:00:00.000Z'),
  ]);
});
