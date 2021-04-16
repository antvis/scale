import { Interpolate } from '../types';

/**
 * 返回一个线性插值器
 * @param a 任意值
 * @param b 任意值
 * @returns 线性插值器
 */
export const createInterpolate: Interpolate = (a, b) => (t) => a * (1 - t) + b * t;

/**
 * 返回一个 round 线性差值器，对输出值进行四舍五入
 * @param a 任意值
 * @param b 任意值
 * @returns 线性插值器
 */
export const createInterpolateRound: Interpolate = (a, b) => (t) => Math.round(createInterpolate(a, b)(t));
