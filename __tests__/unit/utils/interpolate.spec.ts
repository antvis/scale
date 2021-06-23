import { createInterpolateNumber, createInterpolateColor, createInterpolateValue } from '../../../src';
import { createInterpolateRound } from '../../../src/utils';

describe('interpolate', () => {
  test('createInterpolateNumber(a, b) returns a linear interpolator', () => {
    const interpolate = createInterpolateNumber(0, 10);

    expect(interpolate(0.1)).toBe(1);
    expect(interpolate(0.5)).toBe(5);
    expect(interpolate(0.95)).toBe(9.5);
  });

  test('createInterpolateRound(a, b) returns a linear interpolator with rounded output', () => {
    const interpolateRound = createInterpolateRound(0, 10);
    expect(interpolateRound(0.12)).toBe(1);
    expect(interpolateRound(0.14)).toBe(1);
    expect(interpolateRound(0.15)).toBe(2);
  });

  test('createInterpolateColor(a, b) returns a color linear interpolator with valid color input', () => {
    expect(createInterpolateColor('red', 'blue')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');
    expect(createInterpolateColor('#f00', '#00f')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');
    expect(createInterpolateColor('rgb(255,0,0)', 'hsl(240,100%,50%)')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');
    expect(createInterpolateColor('rgb(100%,0%,0%)', 'hsl(240,100%,50%)')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');
    expect(createInterpolateColor('hsl(0,100%,50%)', 'hsl(240,100%,50%)')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');

    expect(createInterpolateColor('reed', 'hsl(240,100%,50%)')(0.5)).toBe('hsl(240,100%,50%)');
    expect(createInterpolateColor('hsl(240,100%,50%)', 'reed')(0.5)).toBe('hsl(240,100%,50%)');
    expect(createInterpolateColor('reed', 'hhh')(0.5)).toBe('hhh');
  });

  test('createInterpolateValue(a, b) returns a linear interpolator ', () => {
    expect(createInterpolateValue(0, 10)(0.1)).toBe(1);
    expect(createInterpolateValue(0, 10)(0.5)).toBe(5);
    expect(createInterpolateValue(0, 10)(0.95)).toBe(9.5);

    expect(createInterpolateValue('red', 'blue')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');
    expect(createInterpolateValue('#f00', '#00f')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');
    expect(createInterpolateValue('rgb(255,0,0)', 'hsl(240,100%,50%)')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');
    expect(createInterpolateValue('rgb(100%,0%,0%)', 'hsl(240,100%,50%)')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');
    expect(createInterpolateValue('hsl(0,100%,50%)', 'hsl(240,100%,50%)')(0.5)).toBe('rgba(127.5, 0, 127.5, 1)');

    expect(createInterpolateValue('reed', 'hsl(240,100%,50%)')(0.5)).toBe('hsl(240,100%,50%)');
    expect(createInterpolateValue('hsl(240,100%,50%)', 'reed')(0.5)).toBe('hsl(240,100%,50%)');
    expect(createInterpolateValue('reed', 'hhh')(0.5)).toBe('hhh');
    expect(createInterpolateValue('reed', 1)(0.5)).toBe('reed');
  });
});
