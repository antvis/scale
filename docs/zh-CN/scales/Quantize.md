# Quantize

类似 Threshold 比例尺，区别在于 thresholds 是根据连续的 domain 根据离散的 range 的数量计算而得到的。

## Usage


## Options

| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `undefined` |
| range | 值域，默认为 [0, 1] | <code>any[]</code> | `undefined` |
| domain | 定义域，默认为 [0, 1] | <code>number[]</code> | `undefined` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: any) => string</code> | `undefined` |
| tickCount | tick 个数，默认值为 5 | <code>number</code> | `undefined` |
| tickMethod | 计算 ticks 的算法 | <code>import("D:/projects/scale/src/types").TickMethod</code> | `undefined` |
| nice |  | <code>boolean</code> | `undefined` |

## Methods

**invert(y: Range&lt;QuantizeOptions&gt;)**

如果是在第一段后或者最后一段就把两端的值添加上

Parameters:

None

Return:

void 

**getThresholds()**


Parameters:

None

Return:

void 

**clone()**


Parameters:

None

Return:

void 

**getTicks()**


Parameters:

None

Return:

void 

