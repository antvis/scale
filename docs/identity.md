# Identity

Identity scales are a special case of linear scales where the domain and range are identical.

## Usage

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
x.getTicks(); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | `number[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0, 1]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display a output value. | `(x: any) => string` | ```(x) => `${x}```|
| tickCount | Sets approximately count representative values from the scale’s domain. | `number` | `5` |
| tickMethod | Sets the method for computing representative values from the scale’s domain. | `(options?: IdentityOptions) => number[]` | r-pretty|

## Methods

<a name="identity_map" href="#identity_map">#</a> **map**<i>(x: number): number | any</i>

Returns the input value itself if it is not `undefined` (or `NaN`), otherwise `options.unknown`.

<a name="identity_invert" href="#identity_invert">#</a> **invert**<i>(x: number): number</i>

Returns the output value itself.

<a name="identity_getTicks" href="#identity_getTicks">#</a> **getTicks**<i>(): number[]</i>

Returns representative values from the scale’s domain computed by specified `options.tickMethod` with `options.
tickCount`.

<a name="identity_update" href="#identity_update">#</a> **update**<i>(options: IdentityOptions): void</i>

Update the scale's options and rescale.

<a name="identity_getOptions" href="#identity_getOptions">#</a> **getOptions**<i>(): IdentityOptions</i>

Returns the scale's current options.

<a name="identity_clone" href="#identity_clone">#</a> **clone**<i>(): Identity</i>

Returns a new identity scale with the independent and same options as the original one.
