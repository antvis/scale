# Identity


## Usage


## Options

| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `undefined` |
| range | 值域，默认为 [0, 1] | <code>number[]</code> | `[0, 1]` |
| domain | 定义域，默认为 [0, 1] | <code>number[]</code> | `[0, 1]` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: number) => string</code> | `(x) => string` |
| tickCount | tick 个数，默认值为 5 | <code>number</code> | `5` |
| tickMethod | 计算 ticks 的算法 | <code>import("D:/projects/scale/src/types").TickMethod</code> | `wilkinsonExtended` |

## Methods

**map(x: Domain&lt;IdentityOptions&gt;)**

输入和输出满足：y = x

Parameters:

x  输入值

Return:

void 

**invert(x: Range&lt;IdentityOptions&gt;)**

map 的逆运算：x = y，在这里和 map 是相同方法

Parameters:

x  输出值

Return:

void 

**clone()**

克隆 Identity Scale

Parameters:

None

Return:

void 

**getTicks()**

根据比例尺的配置去生成 ticks，该 ticks 主要用于生成坐标轴

Parameters:

None

Return:

void 

