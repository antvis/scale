import { clone } from '@antv/util';
import { CategoryOptions, Domain, Range } from '../types';
import { Base } from './base';

/**
 * 更新 indexMap
 *
 * @param arr 初始的数组
 * @param target 目标 map
 * @returns {Map<string, any>} 生成的 indexMap
 */
function updateIndexMap(target: Map<any, number>, arr: any[]) {
  for (let i = 0; i < arr.length; i += 1) {
    if (!target.has(arr[i])) {
      target.set(arr[i], i);
    }
  }
}

interface MapBetweenArrOptions {
  // 需要映射的值
  value: any;
  // indexMapper 由定义域生成的映射表，键为定义域的每一个值，值为所在下标
  mapper: Map<any, number>;
  // 定义域
  from: any[];
  // 值域
  to: any[];
  // 当 mapper 中查询不到时的返回值
  notFoundReturn?: any;
}

/**
 * 基于 indexMap 进行映射
 *
 * @param options 相关选项
 * @see MapBetweenArrOptions
 * @return {any} 映射结果
 */
function mapBetweenArrByMapIndex(options: MapBetweenArrOptions) {
  const { value, from, to, mapper, notFoundReturn } = options;
  let mappedIndex = mapper.get(value);

  // index 不存在时，我们将 value 添加到原数组, 并更新 Map
  if (mappedIndex === undefined) {
    if (notFoundReturn) {
      return notFoundReturn;
    }
    mappedIndex = from.push(value) - 1;
    mapper.set(value, mappedIndex);
  }

  return to[mappedIndex % to.length];
}

export class Category extends Base<CategoryOptions> {
  private domainIndexMap: Map<any, number>;

  private shouldDomainIndexMapUpdate: boolean = true;

  private rangeIndexMap: Map<any, number>;

  private shouldRangeIndexMapUpdate: boolean = true;

  // 覆盖默认配置
  constructor(options?: Partial<CategoryOptions>) {
    super(options, {
      domain: [],
      range: [],
    });
  }

  private initDomainIndexMap() {
    if (!this.domainIndexMap) {
      this.domainIndexMap = new Map();
    } else {
      this.domainIndexMap.clear();
    }
    updateIndexMap(this.domainIndexMap, this.getDomain());
    this.shouldDomainIndexMapUpdate = false;
  }

  private initRangeIndexMap() {
    if (!this.rangeIndexMap) {
      this.rangeIndexMap = new Map();
    } else {
      this.rangeIndexMap.clear();
    }
    updateIndexMap(this.rangeIndexMap, this.getRange());
    this.shouldRangeIndexMapUpdate = false;
  }

  public map(x: Domain<CategoryOptions>) {
    if (this.shouldDomainIndexMapUpdate) {
      this.initDomainIndexMap();
    }

    return mapBetweenArrByMapIndex({
      value: x,
      mapper: this.domainIndexMap,
      from: this.getDomain(),
      to: this.getRange(),
      notFoundReturn: this.options.unknown,
    });
  }

  public invert(y: Range<CategoryOptions>) {
    if (this.shouldRangeIndexMapUpdate) {
      this.initRangeIndexMap();
    }

    return mapBetweenArrByMapIndex({
      value: y,
      mapper: this.rangeIndexMap,
      from: this.getRange(),
      to: this.getDomain(),
      notFoundReturn: this.options.unknown,
    });
  }

  public update(options: Partial<CategoryOptions>) {
    super.update(options);
    if (options.range) {
      this.shouldRangeIndexMapUpdate = true;
    }
    if (options.domain) {
      this.shouldDomainIndexMapUpdate = true;
    }
  }

  public clone() {
    return new Category(clone(this.options));
  }

  private getDomain() {
    return this.getOptions().domain;
  }

  private getRange() {
    return this.getOptions().range;
  }
}
