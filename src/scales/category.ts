import { clone } from '@antv/util';
import { CategoryOptions, Domain, Range } from '../types';
import { Base } from './base';

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

/**
 * Category 比例尺
 *
 * 该比例尺具有离散的域和范围，例如将一组命名类别映射到一组颜色
 *
 * - 使用 for 替代一些基于 map 的遍历，for 循环性能远高于 forEach, map
 * - 阻止无意义的更新，只有到用户调用 map、invert 或者 update 之后才会进行相应的更新
 * - 两个 map 只初始化一次，在之后的更新中复用他们，这样我们避免了重复 new Map 带来的性能问题
 *   在大量调用 update 函数场景下，较 d3-scale 效率有质的提高
 */
export class Category extends Base<CategoryOptions> {
  // 定义域映射表
  private domainIndexMap: Map<any, number> = new Map();

  // 值域映射表
  private rangeIndexMap: Map<any, number> = new Map();

  // 覆盖默认配置
  protected getOverrideDefaultOptions() {
    return {
      domain: [],
      range: [],
    };
  }

  private initDomainIndexMap() {
    updateIndexMap(this.domainIndexMap, this.getDomain());
  }

  private initRangeIndexMap() {
    updateIndexMap(this.rangeIndexMap, this.getRange());
  }

  public map(x: Domain<CategoryOptions>) {
    if (this.domainIndexMap.size === 0) {
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
    if (this.rangeIndexMap.size === 0) {
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
    // TODO: update 直接 clear 有点暴力，在实际情况下前后的数据应该是相似的, 有没有可能 diff 一下在对 Map 进行更新？
    // 查看 range 和 domain, 是否更新，如果被更新，我们重置之
    if (options.range) {
      this.rangeIndexMap.clear();
    }
    if (options.domain) {
      this.domainIndexMap.clear();
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
