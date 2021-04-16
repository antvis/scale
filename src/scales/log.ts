import { Continuous } from './continuous';
import { LinearOptions } from '../types';

export class Log extends Continuous<LinearOptions> {
  protected chooseTransform() {
    return undefined;
  }

  protected chooseUntransform() {
    return undefined;
  }

  public clone(): Log {
    return new Log(this.options);
  }

  protected nice(): void {}
}
