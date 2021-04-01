import { CategoryOptions, Domain, Range } from '../types';
import { Base } from './base';

/**
 * 基于一个初始数组，创建一个 indexMap，key 为数组的每一项，value 为该项所在的下标
 *
 * @param arr 初始的数组
 * @returns {Map<string, any>} 生成的 indexMap
 */
const createIndexMap = (arr: any[]): Map<any, number> => {
  const entries: [any, number][] = arr.map((item, index) => [item, index]);
  return new Map(entries);
};

/**
 * 基于 indexMap 进行映射
 *
 * @param value 需要映射的值
 * @param from 定义域
 * @param to 值域
 * @param mapper indexMapper 由定义域生成的映射表，键为定义域的每一个值，值为所在下标
 * @param notFoundReturn 当 mapper 中查询不到时的返回值
 * @return {any} 映射结果
 *
 */
const mapBetweenArrByMapIndex = (
  value: any,
  mapper: Map<any, number>,
  from: any[],
  to: any[],
  notFoundReturn?: any
) => {
  let mappedIndex = mapper.get(value);

  // index 不存在时，我们将 value 添加到原数组, 并更新 Map
  if (mappedIndex < 0 || Number.isNaN(mappedIndex)) {
    if (notFoundReturn) {
      return notFoundReturn;
    }
    mappedIndex = from.push(value) - 1;
    mapper.set(value, mappedIndex);
  }

  return to[mappedIndex % to.length];
};

export class Category extends Base<CategoryOptions> {
  private domainIndexMap: Map<any, number>;

  private rangeIndexMap: Map<any, number>;

  // 覆盖默认配置
  constructor(options?: Partial<CategoryOptions>) {
    super(options, {
      domain: [],
      range: [],
    });

    this.initDomainIndexMap();
    this.initRangeIndexMap();
  }

  private initDomainIndexMap() {
    this.domainIndexMap = createIndexMap(this.getDomain());
  }

  private initRangeIndexMap() {
    this.rangeIndexMap = createIndexMap(this.getRange());
  }

  public map(x: Domain<CategoryOptions>) {
    if (!this.domainIndexMap) {
      this.initDomainIndexMap();
    }
    return mapBetweenArrByMapIndex(x, this.domainIndexMap, this.getDomain(), this.getRange(), this.options.unknown);
  }

  public invert(y: Range<CategoryOptions>) {
    if (!this.rangeIndexMap) {
      this.initRangeIndexMap();
    }
    return mapBetweenArrByMapIndex(y, this.rangeIndexMap, this.getRange(), this.getDomain(), this.options.unknown);
  }

  public update(options: Partial<CategoryOptions>) {
    super.update(options);

    // 重置 indexMap
    this.initRangeIndexMap();
    this.initDomainIndexMap();
  }

  public clone() {
    return new Category(this.options);
  }

  private getDomain() {
    return this.getOptions().domain;
  }

  private getRange() {
    return this.getOptions().range;
  }
}
