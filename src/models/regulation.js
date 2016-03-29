import Base from './base';
import getNationality from '../utils/nationality';

class Regulation extends Base {
  constructor(props) {
    super(props);
    this.customerType = 'individual';
    this.jurisdiction = getNationality();
  }
}

export default Regulation;
