# Sqrt


## Usage


## Options

| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `undefined` |
| range | 值域，默认为 [0, 1] | <code>number[]</code> | `undefined` |
| domain | 定义域，默认为 [0, 1] | <code>number[]</code> | `undefined` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: number) => string</code> | `undefined` |
| tickCount | tick 个数，默认值为 5 | <code>number</code> | `undefined` |
| tickMethod | 计算 ticks 的算法 | <code>import("D:/projects/scale/src/types").TickMethod</code> | `undefined` |
| nice | 是否需要对定义域的范围进行优化 | <code>boolean</code> | `undefined` |
| clamp | 是否需要限制输入的范围在值域内 | <code>boolean</code> | `undefined` |
| round | 是否需要对输出进行四舍五入 | <code>boolean</code> | `undefined` |
| interpolate | 插值器的工厂函数，返回一个对归一化后的输入在值域指定范围内插值的函数 | <code>import("D:/projects/scale/src/types").Interpolate</code> | `undefined` |
| exponent | 指数 | <code>number</code> | `undefined` |

## Methods

**clone()**


Parameters:

None

Return:

void 

