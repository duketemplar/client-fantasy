function* enterOrder(next) {
  // const formData = this.request.body;
  // const order = JSON.parse(formData.value);

  console.log('request', this.request);

  this.body = { 
    order_id: 1,
    result_code: 'OK'
  };

  yield next;
}

module.exports = {
  enterOrder: enterOrder
};
