import Base from './base';
import {
  requiredFieldValidator,
  regexValidator,
} from '../utils/validators';

class Kyc extends Base {

}

Kyc.validators = {
  taxableOutsideJurisdiction: [
    (value) => requiredFieldValidator('This question needs to be answered.', value),
    (value) => regexValidator(/^(yes|no)$/, 'This question needs to be answered.', value),
  ],
  USCitizen: [
    (value) => requiredFieldValidator('This question needs to be answered.', value),
  ],
  employment: [
    (value) => requiredFieldValidator('This question needs to be answered.', value),
  ],
  income: [
    (value) => requiredFieldValidator('This question needs to be answered.', value),
  ],
  sourceOfFunds: [
    (value) => requiredFieldValidator('This question needs to be answered.', value),
  ],
  yearlyDeposits: [
    (value) => requiredFieldValidator('This question needs to be answered.', value),
  ],
  politicallyExposedPerson: [
    (value) => requiredFieldValidator('This question needs to be answered.', value),
  ],
};

export default Kyc;
