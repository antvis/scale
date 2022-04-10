
import { getTickMethod } from '../../../src/tick-method/index';

function getArr(count) {
  const arr = [];
  for(let i = 1; i <= count; i++) {
    arr.push(i.toString());
  }
  return arr;
}

describe('test time cat ticks', () => {
  const cat = getTickMethod('time-cat');
  it('get', () => {
    expect(cat).not.toBe(undefined);
  });

  it('tickCount > length', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr,
      tickCount: 20
    });
    expect(ticks).toEqual(arr);
  });

  it('no tickCount', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr
    });
    expect(ticks).toEqual(arr);
  });

  it('14', () => {
    const arr = getArr(14);
    const ticks = cat({
      values: arr,
      tickCount: 7
    });
    expect(ticks).toEqual(["1", "3", "5", "7", "9", "11", "13", "14"]);
  });

  it('7', () => {
    const arr = getArr(7);
    expect(cat({values: arr, tickCount: 7})).toEqual(arr);
  });

  it('10', () => {
    const arr = getArr(10);
    expect(cat({values: arr, tickCount: 7})).toEqual(arr.slice(0, 7).concat('10'));
  });

  it('30, 31', () => {
    const ticks = cat({values: getArr(30), tickCount: 7});
    expect(ticks).toEqual(["1", "6", "11", "16", "21", "26", "30"]);
    const ticks1 = cat({values: getArr(31), tickCount: 7});
    expect(ticks1).toEqual(["1", "6", "11", "16", "21", "26", "31"]);
  });
});