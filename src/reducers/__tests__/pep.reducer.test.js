import reducers from '../regulation.reducer';
import { expect } from 'chai';
import { Pep } from '../../models';
import { changePep } from '../../actions';

describe.only('prospect.reducer', () => {
  it('should initialize pep', () => {
    expect(reducers.pep(undefined, { type: '@@init' })).to.eql(new Pep());
  });

  it('should update only changed fields', () => {
    const initialState = new Pep({ isPep: true });
    const action = changePep({ isPep: false });

    expect(reducers.pep(initialState, action)).to.eql(new Pep({ isPep: false }));
  });

  it('should validate changed fields', () => {
    const initialState = {};
    const action = changePep({
      isPep: null,
    });
    expect(reducers.pepValidations(initialState, action)).to.eql({
      isPep: 'This question needs to be answered.',
    });
  });
});
