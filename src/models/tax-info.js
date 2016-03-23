import { notBlankValidator } from '../utils/validators';
import Base from './base';

class TaxInfo extends Base {
  constructor(props) {
    super(props);
  }
}

TaxInfo.validators = {
  taxableOutsideJurisdiction: [
    (value) => notBlankValidator('Must be filled in.', value),
  ],
  taxableInJurisdiction: [
    (value) => notBlankValidator('Must be filled in.', value),
  ],
};

export default TaxInfo;
