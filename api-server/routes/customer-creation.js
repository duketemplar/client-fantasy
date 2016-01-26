function* registrations(next) {
  const formData = this.request.body;

  const requiredFields = ['civicRegistrationNumber', 'firstName', 'lastName'];

  var status = 'SUCCESS';
  const error = [];

  requiredFields.forEach(field => {
    if (formData[field] === 'undefined' || formData[field].length < 1) {
      status = 'FAILED';
      error.push(`${field} is empty`);
    }
  });

  this.body = {
    status,
    error,
    data: formData,
  };

  yield next;
}

module.exports = {
  registrations: registrations,
};
