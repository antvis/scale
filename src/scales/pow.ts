import { Continuous, Transform } from './continuous';
import { PowOptions } from '../types';
import { Base } from './base';

export class Pow extends Continuous<PowOptions> {
  protected chooseTransform(): Transform {
    return undefined;
  }

  protected chooseUntransform(): Transform {
    return undefined;
  }

  clone(): Base<PowOptions> {
    return undefined;
  }

  protected nice(): void {}
}
