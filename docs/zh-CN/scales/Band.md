# Band

Band 比例尺

一种特殊的 category scale，区别在于值域的范围是连续的。
使用的场景例如柱状图，可以用来定位各个柱子水平方向距离原点开始绘制的距离、各柱子之间的间距

由于部分选项较为抽象，见下图描述：

```plain
PO = paddingOuter
PI = paddingInner

domain = [A, B]

|<------------------------------------------- range ------------------------------------------->|
|             |                   |             |                   |             |             |
|<--step*PO-->|<----bandWidth---->|<--step*PI-->|<----bandWidth---->|<--step*PI-->|<--step*PO-->|
|             | ***************** |             | ***************** |             |             |
|             | ******* A ******* |             | ******* B ******* |             |             |
|             | ***************** |             | ***************** |             |             |
|             |<--------------step------------->|                                               |
|-----------------------------------------------------------------------------------------------|
```

## Usage

```ts
import { Band, BandOptions } from '@antv/scale';

const options: BandOptions = {
 domain: ['one', 'two', 'three', 'four'],
 range: [0, 100],
};

const x = new Band(options);

x.map('one'); // 0
x.map('two'); // 25
x.invert(50); // 'three'
x.invert(75); // 'four'
x.getBandWidth();  // 25
```

## Options
| Key | Description | Type | Default|
| ----| ----------- | -----| -------|
| unknown | 当需要映射的值不合法的时候，返回的值 | <code>any</code> | `[]` |
| range | 值域，默认为 [0, 1] | <code>number[]</code> | `[]` |
| domain | 定义域，默认为 [0, 1] | <code>(string 丨 number)[]</code> | `[]` |
| formatter | tick 格式化函数，会影响数据在坐标轴 axis、legend、tooltip 上的显示 | <code>(x: number) => string</code> | `[]` |
| round | 是否取整 | <code>boolean</code> | `[]` |
| paddingInner | 内部边距 | <code>number</code> | `[]` |
| paddingOuter | 两侧边距 | <code>number</code> | `[]` |
| padding | 同时定义内部边距和两侧边距，如果该值大于 0，则 paddingInner 和 paddingOuter 无效 | <code>number</code> | `[]` |
| align | 对齐，取值为 0 - 1 的整数，例如 0.5 表示居中 | <code>number</code> | `[]` |