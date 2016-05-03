const helpers = require('../helpers');

function* freeze(next) {
  const prospectId = this.params.prospectId;

  this.status = 204;

  yield next;

  yield helpers.delayResponse();
}

module.exports = {
  freeze,
};
