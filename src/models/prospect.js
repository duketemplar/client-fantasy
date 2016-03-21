import {
  nationalRegistrationNumberValidator,
  emailValidator,
  notBlankValidator,
  regexValidator,
  lengthValidator,
} from '../utils/validators';
import getNationality from '../utils/nationality';
import Base from './base';

class Prospect extends Base {
  constructor(props) {
    super(props);
    this.national_id_number_country_code = getNationality();
  }
}

Prospect.validators = {
  national_id_number: [
    (value) => nationalRegistrationNumberValidator(getNationality(), 'Must be a real national registration number', value),
    (value) => notBlankValidator('Must be filled in.', value),
  ],
  phoneNumber: [
    (value) => lengthValidator(7, 'Must be a real phonenumber', value),
  ],
  email: [
    (value) => notBlankValidator('Must be filled in.', value),
    (value) => emailValidator('not a valid email', value),
  ],
  firstName: [
    (value) => regexValidator(/^[a-zA-Z.\s]+$/, 'Must only contain letters', value),
    (value) => notBlankValidator('Must be filled in.', value),
    (value) => lengthValidator(3, 'Must be at least 2 characters.', value),
  ],
  lastName: [
    (value) => notBlankValidator('Must be filled in.', value),
    (value) => lengthValidator(3, 'Must be at least 2 characters.', value),
  ],
  citizen: [
    (value) => notBlankValidator('Must be filled in.', value),
  ],
  country: [
    (value) => notBlankValidator('Must be filled in.', value),
  ],
};

export default Prospect;
