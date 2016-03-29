// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import reducers from '../prospect.reducer';
import { expect } from 'chai';
import { Prospect } from '../../models';
import { changeProspect, RECEIVED_PROSPECT } from '../../actions';

describe('prospect.reducer', () => {
  it('should initialize the state for prospect', () => {
    const initialState = undefined;

    expect(reducers.prospect(initialState, { type: '@@init' })).to.eql(new Prospect());
  });

  it('should update only the parts changed', () => {
    const initialState = new Prospect({
      id: 'this-is-id',
      email: 'test@test.se',
    });

    const action = changeProspect({ email: 'test-new@test.se', phoneNumber: '12345' });

    expect(reducers.prospect(initialState, action)).to.eql(new Prospect({
      id: 'this-is-id',
      email: 'test-new@test.se',
      phoneNumber: '12345',
    }));
  });

  it('should merge propsects on recieved', () => {
    const initialState = new Prospect({
      id: 'this-is-id',
      email: 'test@test.se',
    });

    const action = { type: RECEIVED_PROSPECT, prospect: { email: 'test-new@test.se', phoneNumber: '12345', id: 'this-is-id-new' } };

    expect(reducers.prospect(initialState, action)).to.eql(new Prospect({
      id: 'this-is-id-new',
      email: 'test-new@test.se',
      phoneNumber: '12345',
    }));
  });

  it('should initialize the state for prospectValidations', () => {
    const initialState = undefined;

    expect(reducers.prospectValidations(initialState, { type: '@@init' })).to.eql({});
  });

  it('should validate changed prospect fields', () => {
    const initialState = {};
    const action = changeProspect({
      nationalIdNumber: 'abc',
      phoneNumber: '123456',
      email: 'not@valid',
      firstName: '123',
      lastName: 'b',
      citizen: null,
      country: null,
    });
    expect(reducers.prospectValidations(initialState, action)).to.eql({
      nationalIdNumber: 'Must be a real national registration number.',
      phoneNumber: 'Must be a real phonenumber.',
      email: 'Not a valid email.',
      firstName: 'Must only contain letters.',
      lastName: 'Must be at least 2 characters.',
      citizen: 'Must be filled in.',
      country: 'Must be filled in.',
    });
  });
});
