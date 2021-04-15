# Pow

Power scales creates a power based scale, which transform the output by exponent option.

## Usage

```ts
const scale = new Pow({
  domain: [0, 100],
  range: [0, 100],
  exponent: 2
});

scale.map(0); // 0
scale.map(50); // 25
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
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(options?: PowOptions) => number[]` | `calculatePowTicks` |
| round | round the output of map or invert. | `boolean` | `false` |
| clamp | If clamp option is truthy, the return value of the scale is always within the scale’s range. | `boolean` | `false` |
| nice | Extends the domain so that it starts and ends on nice round values. | `boolean` | `false` |
| interpolate | If interpolate is specified, sets the scale’s range interpolator factory. | `(a: number, b: number) => (t: number) => number` | `(a, b) => (t) => a * (1 - t) + b * t` |
| exponent | Sets the scale’s exponent for map or invert methods. | `number` | `2` |

## Methods

<a name="Pow_map" href="#Pow_map">#</a> **map**<i>(x: number): number</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="Pow_invert" href="#Pow_invert">#</a> **invert**<i>(x: number): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="Pow_update" href="#Pow_update">#</a> **update**<i>(options: PowOptions): void</i>

Update the scale's options and rescale.

<a name="Pow_getOptions" href="#Pow_getOptions">#</a> **getOptions**<i>(): PowOptions</i>

Returns the scale's current options.

<a name="Pow_clone" href="#Pow_clone">#</a> **clone**<i>(): Pow</i>

Returns a new Pow scale with the independent and same options as the original one.

<a name="Pow_get_ticks" href="#Pow_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns a series of representative values from the scale’s domain.
