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

Methods for computing representative values.

- [D3 Ticks](./tick-methods.md#d3-ticks) - D3 ticks in d3-array.
- [R Pretty](./tick-methods.md#r-pretty) - An algorithm for positioning tick labels on axes in R language.
- [Wilkinson Extended](./tick-methods.md#wilkinson-extended) - An extension of Wilkinson's algorithm for positioning tick labels on axes.

## Interpolators

Built-in interpolator factories for continuous scale.

- [createInterpolateNumber](./interpolators.md#createInterpolateNumber) - Returns a number interpolator.
- [createInterpolateColor](./interpolators.md#createInterpolateColor) - Returns a color interpolator.
- [createInterpolateValue](./interpolators.md#createInterpolateValue) - Returns a interpolator which can interpolate numbers and colors depending on input type.

## Constants

Constants for tickInterval option used in time scale.

- [DURATION_SECOND](./constants.md#DURATION_SECOND) - The number of milliseconds for one second.
- [DURATION_MINUTE](./constants.md#DURATION_MINUTE) - The number of milliseconds for one minute.
- [DURATION_HOUR](./constants.md#DURATION_HOUR) - The number of milliseconds for one hour.
- [DURATION_DAY](./constants.md#DURATION_DAY) - The number of milliseconds for one day.
- [DURATION_WEEK](./constants.md#DURATION_WEEK) - The number of milliseconds for one week.
- [DURATION_MONTH](./constants.md#DURATION_MONTH) - The number of milliseconds for one month.
- [DURATION_YEAR](./constants.md#DURATION_YEAR) - The number of milliseconds for one year.
