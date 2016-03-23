import { TaxInfo } from '../../models';
import { changeTaxInfo } from '../../actions';
import reducers from '../tax-info.reducer';
import { expect } from 'chai';

describe('tax-info.reducer', () => {
  it('should be able to change fields', () => {
    let action = changeTaxInfo({ taxableInJurisdiction: true, taxableOutsideJurisdiction: false });
    let changedTaxInfo = reducers.taxInfo(new TaxInfo(), action);

    expect(changedTaxInfo).to.eql({ taxableInJurisdiction: true, taxableOutsideJurisdiction: false });

    action = changeTaxInfo({ taxableInJurisdiction: false });
    changedTaxInfo = reducers.taxInfo(changedTaxInfo, action);

    expect(changedTaxInfo).to.eql({ taxableInJurisdiction: false, taxableOutsideJurisdiction: false });
  });

  it('should validate', () => {
    const action = changeTaxInfo({ taxableInJurisdiction: null, taxableOutsideJurisdiction: false });

    expect(reducers.taxInfoValidations(undefined, action)).to.eql({
      taxableInJurisdiction: 'Must be filled in.',
      taxableOutsideJurisdiction: null,
    });
  });
});
