import Quantize from './quantize';

class Quantile extends Quantize {
  public type = 'quantile';
  public tickMethod = 'quantile';
}

export default Quantile;
