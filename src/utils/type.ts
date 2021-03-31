import { BaseOptions } from '../types';

export type Domain<O extends BaseOptions> = O['domain'][number];

export type Range<O extends BaseOptions> = O['range'][number];

export type Unknown<O extends BaseOptions> = O['unknown'];
