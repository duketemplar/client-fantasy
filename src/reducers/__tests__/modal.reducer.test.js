import reducers from '../modal.reducer';
import { expect } from 'chai';
import { toggleModal } from '../../actions';

describe('modal.reducer', () => {
  it('should toggle the state for modal', () => {
    const initialState = { show: 'potato' };
    const action = toggleModal({ show: true });
    expect(reducers.showModal(initialState, action)).to.eql({
      show: true,
    });
  });
});
