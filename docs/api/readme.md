# @antv/scale API

## Scales

- Continuous
  - [Linear](./docs/scales/linear.md) - Indicate a linear relationship between input and output.
  - [Identity](./docs/scales/identity.md) - A special case of linear scales where the domain and range are identical.
  - [Constant](./docs/scales/constant.md) - Map input to a fixed output.
  - [Pow](./docs/scales/pow.md) - Creates a power based scale, which transform the output by exponent option.
  - [Sqrt](./docs/scales/sqrt.md) - Creates a square-root based scale, similar to Pow scale.
  - [Log](./docs/scales/log.md) - The logarithmic transformation will be applied to the input domain value.
  - [Time](./docs/scales/time.md) - A variant of linear scales that have a temporal domain.
- Distribution
  - [Threshold](./docs/scales/threshold.md) - Divide continuous domain into slices and map value in each slice to discrete values in the range.
  - [Quantize](./docs/scales/quantize.md) - Map input in each slice to corresponding output in range.
  - [Quantile](./docs/scales/quantile.md) - Map a discrete input domain to a discrete output domain.
- Discrete
  - [Ordinal](./docs/scales/ordinal.md) - Scale for discrete domain and range.
  - [Band](./docs/scales/band.md) - A special case of ordinal scales where the range is continuous.
  - [Point](./docs/scales/point.md) - A special case of band scales that the bandwidth always fixed to zero.

## 🧮 Tick Methods

- [Wilkinson Extended](docs/tick-methods/wilkinson-extended.md) - An extension of Wilkinson's algorithm for positioning tick labels on axes.
- [R Pretty](docs/tick-methods/r-pretty.md) - An algorithm for positioning tick labels on axes in R language.
- [D3 Ticks](docs/tick-methods/d3-ticks.md) - Linear scale ticks algorithm for d3-scale.

## 🅰️ Constant