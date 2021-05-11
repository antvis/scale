# API Reference

There are three parts of API reference for @antv/scale. Follow the links below to learn more.

- [Scales](#scales)([Continuous](#continuous), [Distribution](#distribution), [Discrete](#discrete))
- [TickMethods](#tick-methods)
- [Constants](#constants)

## Scales

Encodings that map abstract data to visual representation.

### Continuous

Map a continuous, quantitative domain to a continuous range.

- [Linear](./scales/linear.md) - A basic continuous scale that preserve proportional differences for continuous data.
- [Identity](./scales/identity.md) - A special case of linear scales where the domain and range are identical.
- [Constant](./scales/constant.md) - A special case of linear scales which mapping input to a fixed output.
- [Log](./scales/log.md) - Similar to linear scales, except an logarithmic transform is applied to the input domain value before the output range value is computed.
- [Pow](./scales/pow.md) - Similar to linear scales, except an exponential transform is applied to the input domain value before the output range value is computed.
- [Sqrt](./scales/sqrt.md) - A special case of pow scales with exponent fixed to 0.5.
- [Time](./scales/time.md) - Similar to linear scales, but have a have a temporal domain.
  
### Distribution

Map a continuous, quantitative domain to a discrete range.

- [Threshold](./scales/threshold.md) - Divide continuous domain into slices based on specified cut values and map value in each slice to corresponding discrete values in the range.
- [Quantize](./scales/quantize.md) - Similar to threshold scales, but computed cut values based on size of each data.
- [Quantile](./scales/quantile.md) - Similar to threshold scales, but computed cut values based on quantile(ranking of each data).

### Discrete

Map a discrete domain to a discrete or continuous range.

- [Ordinal](./scales/ordinal.md) - Map input value in discrete domain into corresponding discrete values in range.
- [Band](./scales/band.md) - A special case of ordinal scales where the range is continuous.
- [Point](./scales/point.md) - A special case of band scales with bandwidth fixed to zero.

## Tick Methods

Method for computing representative values from specified `min`, `max` and `tickCount`.

- [Wilkinson Extended](./tick-methods/wilkinson-extended.md) - An extension of Wilkinson's algorithm for positioning tick labels on axes.
- [R Pretty](./tick-methods/r-pretty.md) - An algorithm for positioning tick labels on axes in R language.
- [D3 Ticks](./tick-methods/d3-ticks.md) - D3 ticks in d3-array.

## Constants

Constants for tickInterval option used in time scale.

- `DURATION_SECOND`: The number of milliseconds for one second.
- `DURATION_MINUTE`: The number of milliseconds for one minute.
- `DURATION_HOUR`: The number of milliseconds for one hour.
- `DURATION_DAY`: The number of milliseconds for one day.
- `DURATION_WEEK`: The number of milliseconds for one week.
- `DURATION_MONTH`: The number of milliseconds for one month.
- `DURATION_YEAR`: The number of milliseconds for one year.
