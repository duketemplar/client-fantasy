function* prospect(next) {
  this.body = {
    address1: "Stora gatan 23",
    address2: "Annika Andersson",
    citizen: "se",
    city: "Stockholm",
    country: "se",
    email: "anna.andersson@example.com",
    first_name: "Anna",
    last_name: "Andersson",
    natregno: "19120101-1234",
    natregnocoucode: "se",
    phoneNumber: "+46 70 123 45 67",
    regulationId: "4321",
    taxCountry: "se",
    zip: "123 45"
  };

  yield next;
}

module.exports = {
  prospect,
};
