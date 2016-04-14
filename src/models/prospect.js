import {
  nationalRegistrationNumberValidator,
  emailValidator,
  requiredFieldValidator,
  regexValidator,
  lengthValidator,
} from '../utils/validators';
import getNationality from '../utils/nationality';
import Base from './base';

class Prospect extends Base {
  constructor(props) {
    super(props, Prospect.keyTranslations);
    this.nationalIdNumberCountryCode = getNationality();
  }
}

Prospect.keyTranslations = {
  prospect_id: 'id',
};

Prospect.validators = {
  nationalIdNumber: [
    (value) => requiredFieldValidator('COMMON.ERROR.MANDATORY', value),
    (value) => nationalRegistrationNumberValidator(getNationality(), 'INPUT.SSN.ERROR', value),
  ],
  phoneNumber: [
    (value) => requiredFieldValidator('COMMON.ERROR.MANDATORY', value),
    (value) => lengthValidator(7, 'INPUT.PHONE.ERROR', value),
  ],
  email: [
    (value) => requiredFieldValidator('COMMON.ERROR.MANDATORY', value),
    (value) => emailValidator('INPUT.EMAIL.ERROR', value),
  ],
  firstName: [
    (value) => regexValidator(/^[a-zA-Z.\s]+$/, 'COMMON.ERROR.STRING', value),
    (value) => requiredFieldValidator('COMMON.ERROR.MANDATORY', value),
    (value) => lengthValidator(2, 'COMMON.ERROR.LENGTH', value),
  ],
  lastName: [
    (value) => regexValidator(/^[a-zA-Z.\s]+$/, 'COMMON.ERROR.STRING', value),
    (value) => requiredFieldValidator('COMMON.ERROR.MANDATORY', value),
    (value) => lengthValidator(2, 'COMMON.ERROR.LENGTH', value),
  ],
  citizen: [
    (value) => requiredFieldValidator('COMMON.ERROR.MANDATORY', value),
  ],
  country: [
    (value) => requiredFieldValidator('COMMON.ERROR.MANDATORY', value),
  ],
};

export default Prospect;
