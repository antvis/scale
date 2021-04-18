# Point

Point 比例尺

一种特殊的 band scale，它的 bandWidth 恒为 0。

由于部分选项较为抽象，见下图描述：

PO = Padding = PaddingInner
domain =  ["A", "B", "C"]

|<------------------------------------------- range ------------------------------------------->|
|             |                                 |                                 |             |
|<--step*PO-->|<--------------step------------->|<--------------step------------->|<--step*PO-->|
|             |                                 |                                 |             |
|             A                                 B                                 C             |
|-----------------------------------------------------------------------------------------------|

性能方便较 d3 快出 8 - 9 倍

## Usage
TODO

## Options
| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| domain | 定义域，默认为 [0, 1] | <code>(string 丨 number)[]</code> | `[]` |
| range | 值域，默认为 [0, 1] | <code>number[]</code> | `[]` |
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `[]` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: number) => string</code> | `[]` |
| round | 是否取整 | <code>boolean</code> | `[]` |
| padding | 同时定义内部边距和两侧边距，如果该值大于 0，则 paddingInner 和 paddingOuter 无效 | <code>number</code> | `[]` |
| align | 对齐，取值为 0 - 1 的整数，例如 0.5 表示居中 | <code>number</code> | `[]` |