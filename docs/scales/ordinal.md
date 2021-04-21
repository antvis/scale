# Ordinal

Ordinal scales have discrete domain and range.

## Usage

```ts
import { Ordinal, OrdinalOptions } from '@antv/scale';

const options: OrdinalOptions = {
  domain: ['A', 'B', 'C'],
  range: ['a', 'b', 'c'],
  unknown: 'hello world'
};

const x = new Ordinal(options);

x.map('A'); // a
x.map(undefined); // 'hello world'
x.map('B'); // b
x.map('C'); // c
```

```ts
import { Ordinal} from '@antv/scale';

const time = new Ordinal({
  domain: ['2021-04-19', '2021-04-20', '2021-04-18'],
  range: ['A', 'B', 'C'],
  compare: (a, b) => +new Date(a) - +new Date(b),
});

time.map('2021-04-18'); // 'A'
time.map('2021-04-19'); // 'B'
time.map('2021-04-20'); // 'C'
```

## Options

| Key | Description | Type | Default|  
| ----| ----------- | -----| -------|
| domain | Sets the scale’s domain to the specified array of values. | <code>number[] &#124; string[]</code> | `[]` |
| range | Sets the scale’s range to the specified array of values. | <code>number[] &#124; string[]</code> | `[]` |
| unknown | Sets the output value of the scale for `undefined` (or `NaN`) input values. | `any` | `undefined` |
| compare | Sets the comparator for sorting the domain before mapping. | ```(a: string or number, b: string or number) => number```| `undefined` |

## Methods

<a name="ordinal_map" href="#ordinal_map">#</a> **map**<i>(x: (number | string)[]): (number | string)[]</i>

Given a value in the input domain, returns the corresponding value in the output range if it is not `undefined` (or `NaN`), otherwise `options.unknown`

<a name="ordinal_invert" href="#ordinal_invert">#</a> **invert**<i>(x: (number | string) []): (number| string)[]</i>

Given a value from the range, returns the corresponding value from the domain.

<a name="ordinal_update" href="#ordinal_update">#</a> **update**<i>(options: OrdinalOptions): void</i>

Update the scale's options and rescale.

<a name="ordinal_getOptions" href="#ordinal_getOptions">#</a> **getOptions**<i>(): OrdinalOptions</i>

Returns the scale's current options.

<a name="ordinal_clone" href="#ordinal_clone">#</a> **clone**<i>(): Ordinal</i>

Returns a new Ordinal scale with the independent and same options as the original one.

<a name="ordinal_get_domain" href="#ordinal_get_domain">#</a> **getDomain**<i>(): (number | string)[]</i>

Returns the sorted domain.
