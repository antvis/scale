
import { default as timeCat } from '../../../src/tick-method/time-cat';

function getArr(count) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i.toString());
  }
  return arr;
}

describe('tick-method for timeCat ticks', () => {
  it('`tickCount` is larger than the number of ticks', () => {
    const arr = getArr(10);
    const ticks = timeCat({
      values: arr,
      tickCount: 20
    });
    expect(ticks).toEqual(arr);
  });

  it('no tickCount', () => {
    const arr = getArr(10);
    const ticks = timeCat({
      values: arr
    });
    expect(ticks).toEqual(arr);
  });

  it('14', () => {
    const arr = getArr(14);
    const ticks = timeCat({
      values: arr,
      tickCount: 7,
    });
    expect(ticks).toEqual(["1", "3", "5", "7", "9", "11", "14"]);
  });

  it('7', () => {
    const arr = getArr(7);
    expect(timeCat({ values: arr, tickCount: 7 })).toEqual(arr);
  });

  it('10', () => {
    const arr = getArr(10);
    const ticks = timeCat({ values: arr, tickCount: 7 });
    expect(ticks.length).toBe(7);
    expect(ticks).toEqual(arr.slice(0, 6).concat('10'));
  });

  it('30, 31', () => {
    const ticks = timeCat({ values: getArr(30), tickCount: 7 });
    expect(ticks).toEqual(["1", "6", "11", "16", "21", "26", "30"]);
    const ticks1 = timeCat({ values: getArr(31), tickCount: 7 });
    expect(ticks1).toEqual(["1", "6", "11", "16", "21", "26", "31"]);
  });

  it('showLast', () => {
    const values = new Array(10).fill(null).map((_, idx) => `2022-01-${idx + 10}`);
    let ticks = timeCat({ values, tickCount: 7 });
    expect(ticks[6]).toEqual(values[9]);
  });
});