<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

# Scale

> Toolkit for mapping abstract data into visual representation.

![scale mapping](https://user-images.githubusercontent.com/7856674/116353528-85644a80-a829-11eb-85e4-3463a29000a9.png)

[![Build Status](https://github.com/antvis/scale/workflows/build/badge.svg?branch=master)](https://github.com/antvis/scale/actions)
[![Coverage Status](https://img.shields.io/coveralls/github/antvis/scale/master.svg)](https://coveralls.io/github/antvis/scale?branch=master)
[![npm Version](https://img.shields.io/npm/v/@antv/scale.svg)](https://www.npmjs.com/package/@antv/scale)
[![npm Download](https://img.shields.io/npm/dm/@antv/scale.svg)](https://www.npmjs.com/package/@antv/scale)
[![npm License](https://img.shields.io/npm/l/@antv/scale.svg)](https://www.npmjs.com/package/@antv/scale)

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

### ⚖️ Scales

- [x] [Identity](./docs/scales/identity.md)
- [x] [Constant](./docs/scales/constant.md)
- [x] [Linear](./docs/scales/linear.md)
- [x] [Log](./docs/scales/log.md)
- [x] [Sqrt](./docs/scales/sqrt.md)
- [x] [Pow](./docs/scales/pow.md)
- [x] [Time](./docs/scales/time.md)
- [x] [Quantize](./docs/scales/quantize.md)
- [x] [Quantile](./docs/scales/quantile.md)
- [x] [Threshold](./docs/scales/threshold.md)
- [x] [Ordinal](./docs/scales/ordinal.md)
- [x] [Point](./docs/scales/point.md)
- [x] [Band](./docs/scales/band.md)

### 🧮 Tick Methods

- [x] [Wilkinson Extended](docs/tick-methods/wilkinson-extended.md)
- [x] [R Pretty](docs/tick-methods/r-pretty.md)
- [x] [D3 Linear](docs/tick-methods/d3-linear.md)


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
