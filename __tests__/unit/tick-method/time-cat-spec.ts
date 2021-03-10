
import { timeCat } from '../../../src/tick-method';
function getArr(count) {
  const arr = [];
  for(let i = 1; i <= count; i++) {
    arr.push(i.toString());
  }
  return arr;
}
describe('test time cat ticks', () => {
  it('get', () => {
    expect(timeCat).toBeDefined()
  });

  it('tickCount > length', () => {
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
      tickCount: 7
    });
    expect(ticks).toEqual(["1", "3", "5", "7", "9", "11", "13", "14"]);
  });

  it('7', () => {
    const arr = getArr(7);
    expect(timeCat({values: arr, tickCount: 7})).toEqual(arr);
  });

  it('10', () => {
    const arr = getArr(10);
    expect(timeCat({values: arr, tickCount: 7})).toEqual(arr);
  });

  it('30, 31', () => {
    const ticks = timeCat({values: getArr(30), tickCount: 7});
    expect(ticks).toEqual(["1", "6", "11", "16", "21", "26", "30"]);
    const ticks1 = timeCat({values: getArr(31), tickCount: 7});
    expect(ticks1).toEqual(["1", "6", "11", "16", "21", "26", "31"]);
  });
});