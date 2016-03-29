import Base from './base';
import {
  requiredFieldValidator,
} from '../utils/validators';

class Pep extends Base {
  constructor(props) {
    super(props);
  }
}

Pep.validators = {
  isPep: [
    (value) => requiredFieldValidator('This question needs to be answered.', value),
  ],
};

export default Pep;
