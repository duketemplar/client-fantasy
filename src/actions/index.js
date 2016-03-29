import customerCreation from './prospect.action';
import modal from './modal.action';
import regulation from './regulation.action';
import kyc from './kyc.action';
import pep from './pep.action';
import taxInfo from './tax-info.action';

export default {
  ...customerCreation,
  ...modal,
  ...regulation,
  ...taxInfo,
  ...kyc,
  ...pep,
};
