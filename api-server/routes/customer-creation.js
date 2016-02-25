function* prospect(next) {
  const formData = this.request.body;

  this.body = formData;

  yield next;
}

module.exports = {
  prospect,
};
