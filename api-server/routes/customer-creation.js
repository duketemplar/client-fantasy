function* prospect(next) {
  this.body = {
    createdAt: "2016-03-02T15:35:03.138Z",
    id: "1234",
    prospect: {
      address1: "Stora gatan 23",
      address2: "Annika Andersson",
      citizen: "se",
      city: "Stockholm",
      country: "se",
      email: "anna.andersson@example.com",
      firstName: "Anna",
      lastName: "Andersson",
      natregno: "19120101-1234",
      natregnocoucode: "se",
      phoneNumber: "+46 70 123 45 67",
      regulationId: "4321",
      taxCountry: "se",
      zip: "123 45"
    },
    updatedAt: "2016-03-02T15:35:03.139Z"
  };

  yield next;
}

module.exports = {
  prospect,
};
