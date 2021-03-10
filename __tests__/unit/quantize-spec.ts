import { Quantize } from '../../src';

describe('test quantize scale', () => {
  it('init', () => {
    const scale = new Quantize({
      min: 0,
      max: 100
    });
    expect(scale.type).toBe('quantize');
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(100);
    expect(scale.nice).toBe(true);
  });

  it('min, max', () => {
    const scale = new Quantize({
      min: 3,
      max: 97
    });
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(100);
    expect(scale.ticks).toEqual([0, 20, 40, 60, 80, 100]);
    expect(scale.scale(-10)).toBe(0);
    expect(scale.scale(50)).toBe(0.4);
    expect(scale.scale(21)).toBe(0.2);
    expect(scale.scale(73)).toBe(0.6);
    expect(scale.scale(101)).toBe(1);
    expect(scale.invert(0)).toBe(0);
    expect(scale.invert(1)).toBe(100);
    expect(scale.invert(2)).toBe(100);
    expect(scale.invert(0.45)).toBe(45);
    expect(scale.invert(0.6)).toBe(60);
  });

  it('nice false', () => {
    const scale = new Quantize({
      min: 3,
      max: 97,
      nice: false
    });
    expect(scale.min).toBe(3);
    expect(scale.max).toBe(97);
    expect(scale.ticks).toEqual([3, 20, 40, 60, 80, 97]);
    expect(scale.scale(0)).toBe(0);
    expect(scale.scale(3)).toBe(0);
    expect(scale.scale(50)).toBe(0.4);
    expect(scale.scale(21)).toBe(0.2);
    expect(scale.scale(73)).toBe(0.6);
    expect(scale.scale(101)).toBe(1);
    expect(scale.invert(0)).toBe(3);
    expect(scale.invert(0.4)).toBe(40);
    expect(scale.invert(0.59)).toBe(59);
    expect(scale.invert(0.6)).toBe(60);
  });

  it('change min, max', () => {
    const scale = new Quantize({
      min: 3,
      max: 97,
      nice: false
    });
    scale.change({
      min: 23
    });
    expect(scale.min).toBe(23);
    expect(scale.ticks).toEqual([23, 40, 60, 80, 97]);
    scale.change({
      nice: true
    });
    expect(scale.ticks).toEqual([20, 40, 60, 80, 100]);
    expect(scale.scale(50)).toBe(0.25);
    expect(scale.invert(0.25)).toBe(40);
  });

  it('ticks', () => {
    const scale = new Quantize({
      min: 3,
      max: 97,
      ticks: [0, 50, 100]
    });
    expect(scale.min).toBe(0);
    expect(scale.max).toBe(100);
    expect(scale.ticks).toEqual([0, 50, 100]);
    expect(scale.scale(10)).toBe(0);
    expect(scale.scale(60)).toBe(0.5);
    expect(scale.invert(0.6)).toBe(60);

    scale.change({
      ticks: [10, 20, 55, 90, 100]
    });
    expect(scale.min).toBe(3);
    expect(scale.ticks).toEqual([10, 20, 55, 90, 100]);
    expect(scale.scale(15)).toBe(0);
    expect(scale.scale(25)).toBe(0.25);
    expect(scale.scale(60)).toBe(0.5);
    expect(scale.invert(0.5)).toBe(55);
    expect(scale.invert(0.9)).toBe(96);
  });
});