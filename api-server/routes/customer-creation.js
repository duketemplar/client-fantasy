/* jscs:disable maximumLineLength */
let prospect = {
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  prospect_id: 'd7145e77-7dc7-4325-bd70-488af0104007',
  address1: 'Stora gatan 23',
  address2: 'Annika Andersson',
  citizen: 'se',
  city: 'Stockholm',
  country: 'se',
  email: 'anna.andersson@example.com',
  firstName: 'Anna',
  lastName: 'Andersson',
  natregno: '19120101-1234',
  natregnocoucode: 'se',
  phoneNumber: '+46 70 123 45 67',
  regulationId: '4321',
  taxCountry: 'se',
  zip: '123 45',
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
};

function* createProspect(next) {
  const requiredParams = ['national_id_number', 'national_id_number_country_code'];
  if (!checkRequiredParams(requiredParams, this.request.body)) {
    this.body = { createProspect: 'Failed on required parameter check', missing: requiredParams };
    this.status = 400;
  } else {
    this.body = prospect;
    this.status = 200;
  }

  yield next;
}

function* updateProspect(next) {
  if (this.params.prospectId !== prospect.prospect_id) { // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
    this.body = { updateProspect: `Prospect id = ${this.prams.prospectId} not found.` };
    this.status = 400;
  } else {
    const data = this.request.body;
    prospect = Object.assign(prospect, data);
    this.body = {
      /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
      prospect_id: prospect.prospect_id,
      support_automatic: true,
      /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    };

    this.status = 200;
  }

  yield next;
}

function checkRequiredParams(requiredParams, body) {
  let checkOk = false;

  const recievedParams = Object.keys(body);
  if (body) {
    checkOk = recievedParams.some(recievedParam => {
      return requiredParams.indexOf(recievedParam) !== -1;
    });
  }

  return checkOk;
}

module.exports = {
  createProspect,
  updateProspect,
};
