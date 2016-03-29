import { requiredFieldValidator } from '../utils/validators';
import Base from './base';

class TaxInfo extends Base {
  constructor(props) {
    super(props);
    if (this.taxableInJurisdiction === undefined) {
      this.taxableInJurisdiction = true;
    }
  }
}

TaxInfo.validators = {
  taxableOutsideJurisdiction: [
    (value) => requiredFieldValidator('Must be filled in.', value),
  ],
  taxableInJurisdiction: [
    (value) => requiredFieldValidator('Must be filled in.', value),
  ],
};

export default TaxInfo;
