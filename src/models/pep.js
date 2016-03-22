import Base from './base';
import {
  notBlankValidator,
} from '../utils/validators';

class Pep extends Base {
  constructor(props) {
    super(props);
  }
}

Pep.validators = {
  isPep: [
    (value) => notBlankValidator('This question needs to be answered.', value),
  ],
};

export default Pep;
