<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<h1 align="center">
<b>Scale</b>
</h1>

<div align="center">

Toolkit for mapping abstract data into visual representation.

![scale mapping](https://user-images.githubusercontent.com/7856674/116353528-85644a80-a829-11eb-85e4-3463a29000a9.png)

[![Build Status](https://github.com/antvis/scale/workflows/build/badge.svg?branch=master)](https://github.com/antvis/scale/actions)
[![Coverage Status](https://img.shields.io/coveralls/github/antvis/scale/master.svg)](https://coveralls.io/github/antvis/scale?branch=master)
[![npm Version](https://img.shields.io/npm/v/@antv/scale.svg)](https://www.npmjs.com/package/@antv/scale)
[![npm Download](https://img.shields.io/npm/dm/@antv/scale.svg)](https://www.npmjs.com/package/@antv/scale)
[![npm License](https://img.shields.io/npm/l/@antv/scale.svg)](https://www.npmjs.com/package/@antv/scale)

</div>

## ✨ Features

- Powerful
- High performance
- Fully embrace TypeScript

## 📦 Installation

```bash
$ npm install @antv/scale
```

## 🔨 Getting Started

- Basic usage

```ts
import { Linear } from '@antv/scale';

const x = new Linear({
  domain: [0, 10],
  range: [0, 100],
});

x.map(2); // 20

x.invert(20); // 2

x.getTicks(); // [0, 2.5, 5, 7.5, 10]
```

- Customize tickMethod

```ts
import { Linear } from '@antv/scale';

const x = new Linear({
  domain: [0, 10],
  range: [0, 100],
  tickMethod: () => [0, 5, 10],
});

x.getTicks(); // [0, 5, 10]
```

## 📜 API reference

### ⚖️Scales

- [x] [Constant](./docs/scales/constant.md) Map input to a fixed output.
- [x] [Linear](./docs/scales/linear.md) Indicate a linear relationship between input and output.
- [x] [Pow](./docs/scales/pow.md) Creates a power based scale, which transform the output by exponent option.
- [x] [Sqrt](./docs/scales/sqrt.md) Creates a square-root based scale, similar to Pow scale.
- [x] [Log](./docs/scales/log.md) The logarithmic transformation will be applied to the input domain value.
- [x] [Identity](./docs/scales/identity.md) A special case of linear scales where the domain and range are identical.
- [x] [Time](./docs/scales/time.md) A variant of linear scales that have a temporal domain.
- [x] [Threshold](./docs/scales/threshold.md) Divide continuous domain into slices and map value in each slice to discrete values in the range.
- [x] [Quantize](./docs/scales/quantize.md) Map input in each slice to corresponding output in range.
- [x] [Quantile](./docs/scales/quantile.md) Map a discrete input domain to a discrete output domain.
- [x] [Ordinal](./docs/scales/ordinal.md) Scale for discrete domain and range.
- [x] [Band](./docs/scales/band.md) A special case of ordinal scales where the range is continuous.
- [x] [Point](./docs/scales/point.md) A special case of band scales that the bandwidth always fixed to zero.

### 🧮 Tick Methods

- [x] [Wilkinson Extended](docs/tick-methods/wilkinson-extended.md) An extension of Wilkinson's algorithm for positioning tick labels on axes.
- [x] [R Pretty](docs/tick-methods/r-pretty.md) An algorithm for positioning tick labels on axes in R language.
- [x] [D3 Linear](docs/tick-methods/d3-ticks.md) Linear scale ticks algorithm for d3-scale.

## Contribution

```bash
$ git clone git@github.com:antvis/scale.git

$ cd scale

$ npm i

$ npm t
```

Then send a pull request after coding.

## 📄 License

MIT@[AntV](https://github.com/antvis).
