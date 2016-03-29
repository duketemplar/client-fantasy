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
    (value) => nationalRegistrationNumberValidator(getNationality(), 'Must be a real national registration number.', value),
    (value) => requiredFieldValidator('Must be filled in.', value),
  ],
  phoneNumber: [
    (value) => requiredFieldValidator('Must be filled in.', value),
    (value) => lengthValidator(7, 'Must be a real phonenumber.', value),
  ],
  email: [
    (value) => requiredFieldValidator('Must be filled in.', value),
    (value) => emailValidator('Not a valid email.', value),
  ],
  firstName: [
    (value) => regexValidator(/^[a-zA-Z.\s]+$/, 'Must only contain letters.', value),
    (value) => requiredFieldValidator('Must be filled in.', value),
    (value) => lengthValidator(3, 'Must be at least 2 characters.', value),
  ],
  lastName: [
    (value) => requiredFieldValidator('Must be filled in.', value),
    (value) => lengthValidator(3, 'Must be at least 2 characters.', value),
  ],
  citizen: [
    (value) => requiredFieldValidator('Must be filled in.', value),
  ],
  country: [
    (value) => requiredFieldValidator('Must be filled in.', value),
  ],
};

export default Prospect;
