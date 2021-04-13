<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<h1 align="center">
<b>Scale</b>
</h1>

<div align="center">

Toolkit for mapping abstract data into visual representation.

[![Build Status](https://github.com/antvis/scale/workflows/build/badge.svg)](https://github.com/antvis/scale/actions)
[![Coverage Status](https://coveralls.io/repos/github/antvis/scale/badge.svg?branch=master)](https://coveralls.io/github/antvis/scale?branch=master)
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

```ts
import { Linear } from "@antv/scale";

const x = new Linear({
  domain: [0, 10],
  range: [0, 100],
});

x.map(2); // 20
x.invert(20); // 2
x.getTicks(); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## 📜 API reference

### ⚖️ Scales

- [x] [Identity](./docs/identity.md)
- [x] [Constant](./docs/constant.md)
- [ ] Linear
- [ ] Log
- [ ] Sqrt
- [ ] Pow
- [ ] Time
- [ ] Symlog
- [ ] Quantize
- [ ] Quantile
- [x] [Threshold](./docs/threshold.md)
- [ ] Diverging
- [ ] Sequential
- [x] [Category](./docs/category.md)
- [x] [Point](./docs/point.md)
- [x] [Band](./docs/band.md)

### 🧮 Tick Methods

## 📄 License

MIT@[AntV](https://github.com/antvis).
