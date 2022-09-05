# Diverging

Diverging scale creates a scale from an interpolator which maps the interval [0, 0.5, 1] to any arbitrary value.

## Usage

- Basic usage

```ts
import { Diverging, DivergingOptions } from '@antv/scale';

const scale = new Diverging({
  domain: [-10, 0, 10],
  interpolator: (t) => 1 - t,
});

scale.map(5); // 0.25
scale.map(2); // 0.4
scale.map(-5); // 0.75
scale.getOptions().range; // [1, 0.5, 0]
```

## Options

| Key          | Description                                                                                                                                                                                         | Type                                                    | Default       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| domain       | Sets the scale’s domain to the specified array of values.                                                                                                                                           | `number[]`                                              | `[0, 0.5, 1]` |
| unknown      | Sets the output value of the scale for `undefined` (or `NaN`) input values.                                                                                                                         | `any`                                                   | `undefined`   |
| tickCount    | Sets approximately count representative values from the scale’s domain. **The specified `tickCount` in options is only a hint: the scale may return more or fewer values depending on the domain.** | `number`                                                | `5`           |
| tickMethod   | Sets the method for computing representative values from the scale’s domain.                                                                                                                        | `(min: number, max: number, count: number) => number[]` | `d3-ticks`    |
| round        | Rounds the output of map or invert if it is true.                                                                                                                                                   | `boolean`                                               | `false`       |
| clamp        | Constrains the return value of map within the scale’s range if it is true.                                                                                                                          | `boolean`                                               | `false`       |
| nice         | Extends the domain so that it starts and ends on nice round values if it is true.                                                                                                                   | `boolean`                                               | `false`       |
| interpolator | Sets the scale’s range interpolator to map the interval [0, 1].                                                                                                                                     | `(t: number) => any`                                    | `(t) => t`    |

## Methods

<a name="diverging_map" href="#diverging_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="diverging_update" href="#diverging_update">#</a> **update**<i>(options: DivergingOptions): void</i>

Updates the scale's options and rescale.

<a name="diverging_get_options" href="#diverging_get_options">#</a> **getOptions**<i>(): DivergingOptions</i>

Returns the scale's current options.

<a name="diverging_clone" href="#diverging_clone">#</a> **clone**<i>(): diverging</i>

Returns a new Linear scale with the independent and same options as the original one.

<a name="diverging_get_ticks" href="#diverging_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount`.
