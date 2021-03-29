import { assign } from '@antv/util';
import { BaseOptions, Primitive } from '../types';

export const DEFAULT_OPTIONS: BaseOptions = {
  domain: [0, 1],
  range: [0, 1],
  tickCount: 5,
  tickInterval: 10,
  formatter: (x: Primitive) => `${x}`,
  tickMethod: () => [],
};

export default abstract class Base<O extends BaseOptions> {
  abstract map(x: Primitive): Primitive;

  abstract invert(x: Primitive): Primitive;

  abstract clone(): Base<O>;

  protected options: O = {} as O;

  constructor(options?: Partial<O>, defaultOptions: O = DEFAULT_OPTIONS as O) {
    assign(this.options, defaultOptions, options);
  }

  public getOptions(key?: string) {
    return key && this.options[key] ? this.options[key] : this.options;
  }

  public update(updateOptions: Partial<O>) {
    assign(this.options, updateOptions);
  }

  public getTicks() {
    return this.options.tickMethod(this.options);
  }
}
