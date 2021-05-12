# Constant

A special case of [linear scales](./linear.md) which mapping input to a fixed output. Each range value y can be expressed as a function of the domain value x: `y = b`. ([online demo](https://observablehq.com/@pearmini/antv-scale#constant))

## Usage

- Basic usage
  
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

- Customize tickMethod
  
```ts
import { Constant, ConstantOptions, rPretty, wilkinsonExtended } from '@antv/scale';

const options: ConstantOptions = {
  domain: [2, 17],
  tickCount: 6,
};

const x0 = new Constant(options); // default tickMethod is d3Ticks
const x1 = new Constant({
  tickMethod: rPretty
});
const x2 = new Constant({
  tickMethod: wilkinsonExtended
});
const x3 = new Constant({
  tickMethod: (min: number, max: number, count: number) => {
    const step = (max - min) / count;
    return new Array(count).fill(0).map((_, i) => min + i * step);
  }
});

x0.getTicks(); // [2, 4, 6, 8, 10, 12, 14, 16]
x1.getTicks(); // [2, 4, 6, 8, 10, 12, 14, 16, 18]
x2.getTicks(); // [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5]
x3.getTicks(); // [2, 4.5, 7, 9.5, 12, 14.5]
```

## **Options**

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | <code>number[] &#124; string[]</code> | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | <code>number[] &#124; string[]</code> | `[0]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| tickCount | Sets approximately count representative values from the scale’s domain. **The specified `tickCount` in options is only a hint: the scale may return more or fewer values depending on the domain.**| `number` | `5` |
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
