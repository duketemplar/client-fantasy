import reducers from '../pep.reducer';
import { expect } from 'chai';
import { Pep } from '../../models';
import { changePep } from '../../actions';

describe('pep.reducer', () => {
  it('should initialize pep', () => {
    expect(reducers.pep(undefined, { type: '@@init' })).to.eql(new Pep());
  });

  it('should update only changed pep fields', () => {
    const initialState = new Pep({ isPep: true });
    const action = changePep({ isPep: false });

    expect(reducers.pep(initialState, action)).to.eql(new Pep({ isPep: false }));
  });

  it('should validate changed pep fields', () => {
    const initialState = {};
    const action = changePep({
      isPep: null,
    });
    expect(reducers.pepValidations(initialState, action)).to.eql({
      isPep: 'This question needs to be answered.',
    });
  });
});
