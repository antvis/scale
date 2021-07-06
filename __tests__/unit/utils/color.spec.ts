import { string2rbg } from '../../../src/utils/color';

describe('string2rbg', () => {
  test('change css named color string to rgba', () => {
    expect(string2rbg('red')).toEqual([255, 0, 0, 1]);
    expect(string2rbg('blue')).toEqual([0, 0, 255, 1]);
    expect(string2rbg('yellow')).toEqual([255, 255, 0, 1]);
  });

  test('change css hex color string to rgba', () => {
    expect(string2rbg('#FFF')).toEqual([255, 255, 255, 1]);
    expect(string2rbg('#FFFA')).toEqual([255, 255, 255, 0.6666666666666666]);
    expect(string2rbg('#FFFFFFAA')).toEqual([255, 255, 255, 0.6666666666666666]);
  });

  test('change css rgba color string to rgba', () => {
    expect(string2rbg('rgb(0, 145, 20)')).toEqual([0, 145, 20, 1]);
    expect(string2rbg('rgba(0, 145, 20, 0.5)')).toEqual([0, 145, 20, 0.5]);
  });

  test('change css hsl color string to rgba', () => {
    expect(string2rbg('hsl(60, 100%, 20%)')).toEqual([101.99999999999997, 102, 0, 1]);
    expect(string2rbg('hsl(60, 0%, 100%)')).toEqual([255, 255, 255, 1]);
    expect(string2rbg('hsl(20, 20%, 100%)')).toEqual([255, 255, 255, 1]);
    expect(string2rbg('hsl(359, 20%, 100%)')).toEqual([255, 255, 255, 1]);
    expect(string2rbg('hsl(420, 20%, 80%)')).toEqual([214.2, 214.2, 193.80000000000004, 1]);
    expect(string2rbg('hsla(60, 100%, 20%, 0.4)')).toEqual([101.99999999999997, 102, 0, 0.4]);
  });

  test('change invalid css hsl color string to null', () => {
    expect(string2rbg('read')).toBeNull();
    expect(string2rbg('glue')).toBeNull();
    expect(string2rbg('hwb(60, 3%, 60%)')).toBeNull();
  });
});
