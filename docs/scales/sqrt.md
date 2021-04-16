# Sqrt

Sqrt scales creates a square-root based scale, similar to Pow scale.

## Usage

```ts
const scale = new Sqrt({
  domain: [0, 100],
  range: [0, 100]
});

// same as:
// const scale = new Pow({
//   domain: [0, 100],
//   range: [0, 100],
//   exponent: 0.5
// });

scale.map(0); // 0
scale.map(25); // 50
scale.invert(50); // 25

scale.getTicks() // [0, 4, 16, 36, 64, 100]
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display a tick value. | `(x: any) => string` | ```(x) => `${x}```|
| tickCount | Sets approximately count representative values from the scale’s domain. | `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(options?: SqrtOptions) => number[]` | `calculatePowTicks` |
| round | round the output of map or invert. | `boolean` | `false` |
| clamp | If clamp option is truthy, the return value of the scale is always within the scale’s range. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values. | `boolean` | `false` |
| interpolate | If interpolate is specified, sets the scale’s range interpolator factory. | `(a: number, b: number) => (t: number) => number` | `(a, b) => (t) => a * (1 - t) + b * t` |
| exponent | Sets the scale’s exponent for map or invert methods. | `number` | `2` |

## Methods

<a name="Sqrt_map" href="#Sqrt_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="Sqrt_invert" href="#Sqrt_invert">#</a> **invert**<i>(x: number): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="Sqrt_update" href="#Sqrt_update">#</a> **update**<i>(options: SqrtOptions): void</i>

Update the scale's options and rescale.

<a name="Sqrt_getOptions" href="#Sqrt_getOptions">#</a> **getOptions**<i>(): SqrtOptions</i>

Returns the scale's current options.

<a name="Sqrt_clone" href="#Sqrt_clone">#</a> **clone**<i>(): Sqrt</i>

Returns a new sqrt scale with the independent and same options as the original one.

<a name="Sqrt_get_ticks" href="#Sqrt_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns a series of representative values from the scale’s domain.
