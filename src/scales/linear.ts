import { Continuous, Transform } from './continuous';
import { LinearOptions } from '../types';
import { Base } from './base';

export class Linear extends Continuous<LinearOptions> {
  protected chooseTransform(): Transform {
    return undefined;
  }

  protected chooseUntransform(): Transform {
    return undefined;
  }

  clone(): Base<LinearOptions> {
    return undefined;
  }

  protected nice(): void {}
}
