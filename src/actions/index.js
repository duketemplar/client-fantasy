import customerCreation from './prospect.action.js';
import modal from './modal.action.js';
import regulation from './regulation.action.js';

export default {
  ...customerCreation,
  ...modal,
  ...regulation,
};
