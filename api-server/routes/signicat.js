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

  yield (done) => { setTimeout(done, 2000); }; // delaying the response to simulate signicat processing.
}

module.exports = {
  sign: sign,
};
