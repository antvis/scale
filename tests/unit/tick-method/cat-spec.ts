import { default as cat } from '../../../src/tick-method/cat';

function getArr(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i.toString());
  }
  return arr;
}
describe('tick-method for cat ticks', () => {
  describe('({ tickCount: ... }', () => {
    it('normal tickCount', () => {
      const arr = getArr(10);
      const ticks = cat({
        values: arr,
        tickCount: 3,
      });
      expect(ticks.length).toEqual(3);
    });

    it('({ tickCount: 1 })', () => {
      const arr = getArr(10);
      const ticks = cat({
        values: arr,
        tickCount: 1,
      });
      expect(ticks.length).toEqual(1);
    });

    it('({ tickCount: 0 })', () => {
      const arr = getArr(10);
      const ticks = cat({
        values: arr,
        tickCount: 0,
      });
      expect(ticks.length).toEqual(0);
    });

    it('`tickCount` is larger than the number of ticks', () => {
      const arr = getArr(10);
      const ticks = cat({
        values: arr,
        tickCount: 20,
      });
      expect(ticks.length).toEqual(10);
    });
  });

  describe('({ tickInterval: ... })', () => {
    it('priority of `tickInterval` is higher than `tickCount`', () => {
      const arr = getArr(10);
      const ticks = cat({
        values: arr,
        tickInterval: 2,
        tickCount: 3
      });
      expect(ticks.length).toEqual(arr.length / 2);
    });

    it('`tickInterval` larger than the number of ticks will cause the final ticks has one', () => {
      const arr = getArr(10);
      const ticks = cat({
        values: arr,
        tickInterval: 20,
      });
      expect(ticks.length).toEqual(1);
    });
  });

  describe('others', () => {
    it('min and max', () => {
      const arr = getArr(10);
      const ticks = cat({
        values: arr,
        min: 2,
        max: 8,
      });
      expect(ticks.length).toEqual(8 - 2 + 1);
    });

    it('no tickCount or tickInterval', () => {
      const arr = getArr(10);
      const ticks = cat({
        values: arr,
      });
      expect(ticks).toEqual(arr);
    });

    it('({ tickCount: ..., showLast: ... })', () => {
      const values = new Array(165).fill(null).map((_, d) => `${1850 + d}`);
      let ticks = cat({ tickCount: 7, values });
      expect(ticks[0]).toEqual('1850');
      expect(ticks[6]).toEqual('2012');

      ticks = cat({ tickCount: 7, values, showLast: true });
      expect(ticks[6]).toEqual(values[164]);
    });

    it('({ tickInterval: ..., showLast: ... })', () => {
      const values = ['A', 'B', 'C', 'D', 'E', 'F'];
      let ticks = cat({ tickInterval: 2, values });
      expect(ticks).toEqual(['A', 'C', 'E',]);
      ticks = cat({ tickInterval: 2, values, showLast: true });
      expect(ticks).toEqual(['A', 'C', 'E', 'F']);

      ticks = cat({ tickCount: 7, values, showLast: true });
      expect(ticks[6]).toEqual(values[164]);
    });
  });
});
