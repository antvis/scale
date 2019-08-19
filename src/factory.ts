import Scale, { ScaleConfig } from './base';
import Category from './category';
import Identity from './identity';
import Linear from './linear';
import Log from './linear-log';
import Pow from './linear-pow';
import Time from './time';

type ScaleConstructor<T extends Scale = Scale> = new (cfg: ScaleConfig) => T;

interface ScaleMap {
  category: ScaleConstructor<Category>;
  cat: ScaleConstructor<Category>;
  identity: ScaleConstructor<Identity>;
  linear: ScaleConstructor<Linear>;
  pow: ScaleConstructor<Pow>;
  log: ScaleConstructor<Log>;
  time: ScaleConstructor<Time>;
  [key: string]: ScaleConstructor;
}

const map: Partial<ScaleMap> = {};

function getClass<K extends keyof ScaleMap>(key: K): ScaleMap[K] {
  return map[key];
}

function registerClass<K extends keyof ScaleMap>(key: K, cls: ScaleMap[K]) {
  if (getClass(key)) {
    throw new Error(`type '${key}' existed.`);
  }
  map[key] = cls;
}

export { Scale, getClass as getScale, registerClass as registerScale };
