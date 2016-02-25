function* sign(next) {
  const formData = this.request.body;

  const status = 'SIGNED';
  const error = [];
  const signID = '79840-DFKJH-778-UHDK-23DHF';

  this.body = {
    status: status,
    error: error,
    signID: signID,
  };

  yield next;
}

module.exports = {
  sign: sign,
};
