# Sequential

Sequential scale creates a scale from an interpolator which maps the interval [0, 1] to any arbitrary value.

## Usage

- Basic usage

```ts
import { Sequential, SequentialOptions } from '@antv/scale';

const scale = new Sequential({
  domain: [0, 10],
  interpolator: (t) => 1 - t,
});

scale.map(0.5); // 0.5
scale.map(0.2); // 0.8
scale.map(0.8); // 0.2
scale.getOptions().range; // [1, 0]
```

## Options

| Key          | Description                                                                                                                                                                                         | Type                                                    | Default     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| domain       | Sets the scale’s domain to the specified array of values.                                                                                                                                           | `number[]`                                              | `[0, 1]`    |
| unknown      | Sets the output value of the scale for `undefined` (or `NaN`) input values.                                                                                                                         | `any`                                                   | `undefined` |
| tickCount    | Sets approximately count representative values from the scale’s domain. **The specified `tickCount` in options is only a hint: the scale may return more or fewer values depending on the domain.** | `number`                                                | `5`         |
| tickMethod   | Sets the method for computing representative values from the scale’s domain.                                                                                                                        | `(min: number, max: number, count: number) => number[]` | `d3-ticks`  |
| round        | Rounds the output of map or invert if it is true.                                                                                                                                                   | `boolean`                                               | `false`     |
| clamp        | Constrains the return value of map within the scale’s range if it is true.                                                                                                                          | `boolean`                                               | `false`     |
| nice         | Extends the domain so that it starts and ends on nice round values if it is true.                                                                                                                   | `boolean`                                               | `false`     |
| interpolator | Sets the scale’s range interpolator to map the interval [0, 1].                                                                                                                                     | `(t: number) => any`                                    | `(t) => t`  |

## Methods

<a name="sequential_map" href="#sequential_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="sequential_update" href="#sequential_update">#</a> **update**<i>(options: SequentialOptions): void</i>

Updates the scale's options and rescale.

<a name="sequential_get_options" href="#sequential_get_options">#</a> **getOptions**<i>(): SequentialOptions</i>

Returns the scale's current options.

<a name="sequential_clone" href="#sequential_clone">#</a> **clone**<i>(): Sequential</i>

Returns a new Linear scale with the independent and same options as the original one.

<a name="sequential_get_ticks" href="#sequential_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount`.
