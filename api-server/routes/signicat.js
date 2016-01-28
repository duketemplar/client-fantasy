function* sign(next) {
  const formData = this.request.body;

  const status = 'NOT IMPLEMENTED';
  const error = [];
  const data = {
    msg: 'This was a reply from mocked signicat',
    post: formData,
  };

  this.body = {
    status: status,
    error: error,
    data: data,
  };

  yield next;
}

module.exports = {
  sign: sign,
};
