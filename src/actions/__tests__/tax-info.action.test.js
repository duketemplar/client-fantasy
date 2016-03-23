import actions from '../tax-info.action';
import { expect } from 'chai';

describe('tax-info.actions', () => {
  it('should be able to change', () => {
    const action = actions.changeTaxInfo({ toChange: 'yes' });
    expect(action).to.eql({ type: actions.CHANGE_TAX_INFO, fieldsToChange: { toChange: 'yes' } });
  });
});
