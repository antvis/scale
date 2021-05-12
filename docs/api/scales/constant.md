# Constant

A special case of linear scales which mapping input to a fixed output. Each range value y can be expressed as a function of the domain value x: `y = b`. ([online demo](https://observablehq.com/@pearmini/antv-scale#constant))

## Usage

```ts
import { Constant, ConstantOptions } from '@antv/scale';

const options: ConstantOptions = {
  domain: [0, 10],
  range: [5],
  unknown: 'dirty',
};

const x = new Constant(options);

x.map(1); // 5
x.map('1'); // 5
x.map(undefined); // 'dirty'

x.invert(2); // [0, 10]
x.invert('2'); // [0, 10]
```

## **Options**

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | <code>number[] &#124; string[]</code> | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | <code>number[] &#124; string[]</code> | `[0]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| tickCount | Sets approximately count representative values from the scale’s domain. **The specified `count` in options is only a hint: the scale may return more or fewer values depending on the domain.**| `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(options?: ConstantOptions) => number[]` | `d3-ticks`|

## Methods

<a name="constant_map" href="#constant_map">#</a> **map**<i>(x: number | string): number | any</i>

Returns the first element of range if it is not `undefined` (or `NaN`), otherwise `options.unknown`.

<a name="constant_invert" href="#constant_invert">#</a> **invert**<i>(x: number): (number | string)[]</i>

Returns the domain.

<a name="constant_update" href="#constant_update">#</a> **update**<i>(options: ConstantOptions): void</i>

Updates the scale's options and rescale.

<a name="constant_get_options" href="#constant_get_options">#</a> **getOptions**<i>(): ConstantOptions</i>

Returns the scale's current options.

<a name="constant_clone" href="#constant_clone">#</a> **clone**<i>(): Constant</i>

Returns a new constant scale with the independent and same options as the original one.

<a name="constant_get_ticks" href="#constant_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount` if options.domain are numbers, otherwise `[]`.
