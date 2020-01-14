import { getTickMethod } from '../../../src/tick-method/index';

function getArr(count) {
  const arr = [];
  for(let i = 0; i < count; i++) {
    arr.push(i.toString());
  }
  return arr;
}
describe('test cat ticks', () => {
  const cat = getTickMethod('cat');
  it('get', () => {
    expect(cat).not.toEqual(undefined);
  });

  it('tickInterval', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr,
      tickInterval: 2
    });
    expect(ticks.length).toEqual(arr.length / 2);
  });

  it('tickInterval > 10', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr,
      tickInterval: 20
    });
    expect(ticks.length).toEqual(1);
  });

  it('tickCount', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr,
      min: 0,
      max: 10,
      tickCount: 3
    });
    expect(ticks.length).toEqual(3);
  });

  it('tickCount', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr,
      tickCount: 3
    });
    expect(ticks.length).toEqual(2);
  });

  it('tickCount > length', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr,
      tickCount: 20
    });
    expect(ticks.length).toEqual(10);
  });

  it('no tickCount or tickInterval', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr
    });
    expect(ticks).toEqual(arr);
  });

  it('min and max', () => {
    const arr = getArr(10);
    const ticks = cat({
      values: arr,
      min: 2,
      max: 8
    });
    expect(ticks.length).toEqual(8 - 2 + 1);
  });
  
});