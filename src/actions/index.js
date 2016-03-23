import customerCreation from './prospect.action';
import modal from './modal.action';
import regulation from './regulation.action';
import taxInfo from './tax-info.action';

export default {
  ...customerCreation,
  ...modal,
  ...regulation,
  ...taxInfo,
};
