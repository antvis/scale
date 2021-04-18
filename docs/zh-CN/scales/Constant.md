# Constant


## Usage


## Options

| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `[]` |
| range | 值域，默认为 [0, 1] | <code>(string 丨 number)[]</code> | `[]` |
| domain | 定义域，默认为 [0, 1] | <code>(string 丨 number)[]</code> | `[]` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: string 丨 number) => string</code> | `[]` |

## Methods

**map(_ Domain&lt;ConstantOptions&gt;)**

输入和输出满足：y = b，其中 b 是一个常量，是 options.range 的第一个元素

Parameters:

_  输入值

Return:

void 

**invert(x Range&lt;ConstantOptions&gt;)**

如果 x 是该比例尺的常量（x === b），返回输入值的范围（即定义域），否者返回 []

Parameters:

x  输出值 (常量）

Return:

void 

**clone()**

克隆 Constant Scale

Parameters:

None

Return:

void 

