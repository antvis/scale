import { last } from '@antv/util';
import { ScaleConfig } from '../types';
import { cat } from './cat';
/**
 * 计算时间分类的 ticks, 保头，保尾
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export function timeCat(cfg: ScaleConfig): any[] {
  const ticks = cat(cfg);
  const lastValue = last(cfg.values);
  if (lastValue !== last(ticks)) {
    ticks.push(lastValue);
  }
  return ticks;
}
