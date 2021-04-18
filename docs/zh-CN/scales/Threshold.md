# Threshold

将连续的定义域分段，每一段所有的值对应离散的值域中一个值

## Usage


## Options

| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `[]` |
| range | 值域，默认为 [0, 1] | <code>any[]</code> | `[]` |
| domain | 定义域，默认为 [0, 1] | <code>number[]</code> | `[]` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: any) => string</code> | `[]` |

## Methods

**map(x Domain&lt;ThresholdOptions&gt;)**

二分查找到输入值在哪一段，返回对应的值域中的值

Parameters:

None

Return:

void 

**invert(y Range&lt;ThresholdOptions&gt;)**

在值域中找到对应的值，并返回在定义域中属于哪一段

Parameters:

None

Return:

void 

**clone()**


Parameters:

None

Return:

void 

**update(options Partial&lt;O&gt;)**


Parameters:

None

Return:

void 

