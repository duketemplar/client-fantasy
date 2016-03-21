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
  is_pep: [
    (value) => notBlankValidator('This question needs to be answered.', value),
  ],
};

export default Pep;
