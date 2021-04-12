# Constant

Constant scales map input to a fixed output.

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
| domain | Sets the scale’s domain to the specified array of values. | `number[]` or `string[]` | `[0, 1]` |
| range | Sets the scale’s range to the specified array of values. | `number[]` | `[0]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| formatter | Sets the format function to display a output value. | `(x: any) => string` | ```(x) => `${x}` ```|

## Methods

<a name="constant_map" href="#constant_map">#</a> **map**<i>(x: number | string): number | any</i>

Returns the first element of range if it is not `undefined` (or `NaN`), otherwise `options.unknown`.

<a name="constant_invert" href="#constant_invert">#</a> **invert**<i>(x: number): (number | string)[]</i>

Returns the domain.

<a name="constant_update" href="#constant_update">#</a> **update**<i>(options: constantOptions): void</i>

Update the scale's options and rescale.

<a name="constant_getOptions" href="#constant_getOptions">#</a> **getOptions**<i>(): constantOptions</i>

Returns the scale's current options.

<a name="constant_clone" href="#constant_clone">#</a> **clone**<i>(): constant</i>

Returns a new constant scale with the independent and same options as the original one.
