import reducers from '../regulation.reducer';
import { expect } from 'chai';
import { Pep } from '../../models';
import { changePep } from '../../actions';

describe('prospect.reducer', () => {
  it('should initialize pep', () => {
    expect(reducers.pep(undefined, { type: '@@init' })).to.eql(new Pep());
  });

  it('should update only changed fields', () => {
    const state = new Pep({ isPep: true });
    const action = changePep({ isPep: false });

    expect(reducers.pep(state, action)).to.eql(new Pep({ isPep: false }));
  });
});
