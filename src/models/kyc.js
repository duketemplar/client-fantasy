import Base from './base';
import {
  notBlankValidator,
  regexValidator,
} from '../utils/validators';

class Kyc extends Base {
  constructor(props) {
    super(props);
    this.yearlyIncomeCurrency = 'SEK';
    this.yearlyInsertCurrency = 'SEK';
  }
}

Kyc.validators = {
  taxableOutsideJurisdiction: [
    (value) => notBlankValidator('This question needs to be answered.', value),
    (value) => regexValidator(/^(yes|no)$/, 'This question needs to be answered.', value),
  ],
  USCitizen: [
    (value) => notBlankValidator('This question needs to be answered.', value),
  ],
  employment: [
    (value) => notBlankValidator('This question needs to be answered.', value),
  ],
  income: [
    (value) => notBlankValidator('This question needs to be answered.', value),
  ],
  sourceOfFunds: [
    (value) => notBlankValidator('This question needs to be answered.', value),
  ],
  yearlyDeposits: [
    (value) => notBlankValidator('This question needs to be answered.', value),
  ],
  politicallyExposedPerson: [
    (value) => notBlankValidator('This question needs to be answered.', value),
  ],
};

export default Kyc;
