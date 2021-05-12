# Identity

A special case of [linear scales](./linear.md) where the domain and range are identical. Each range value y can be expressed as a function of the domain value x: `y = x`. ([online demo](https://observablehq.com/@pearmini/antv-scale#idenity))

## Usage

- Basic usage

```ts
import { Identity, IdentityOptions } from '@antv/scale';

const options: IdentityOptions = {
  unknown: 'dirty',
  domain: [0, 10],
};

const x = new Identity(options);

x.map(1); // 1
x.map(undefined); // 'dirty'
x.invert(2); // 2
```

- Customize tickMethod
  
```ts
import { Identity, IdentityOptions, rPretty, wilkinsonExtended } from '@antv/scale';

const options: IdentityOptions = {
  domain: [2, 17],
  tickCount: 6,
};

const x0 = new Identity(options); // default tickMethod is d3Ticks
const x1 = new Identity({
  tickMethod: rPretty
});
const x2 = new Identity({
  tickMethod: wilkinsonExtended
});
const x3 = new Identity({
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

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| tickCount | Sets approximately count representative values from the scale’s domain. **The specified `tickCount` in options is only a hint: the scale may return more or fewer values depending on the domain.** | `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(min: number, max: number, count: number) => number[]` | `d3-ticks` |

## Methods

<a name="identity_map" href="#identity_map">#</a> **map**<i>(x: number): number | any</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="identity_invert" href="#identity_invert">#</a> **invert**<i>(x: number): number</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="identity_get_ticks" href="#identity_get_ticks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.tickCount`.

<a name="identity_update" href="#identity_update">#</a> **update**<i>(options: IdentityOptions): void</i>

Updates the scale's options and rescale.

<a name="identity_get_options" href="#identity_get_options">#</a> **getOptions**<i>(): IdentityOptions</i>

Returns the scale's current options.

<a name="identity_clone" href="#identity_clone">#</a> **clone**<i>(): Identity</i>

Returns a new identity scale with the independent and same options as the original one.
