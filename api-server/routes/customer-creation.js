/* jscs:disable maximumLineLength */
let prospect = {
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  prospect_id: 'd7145e77-7dc7-4325-bd70-488af0104007',
  automatic: true,
  /* NOT IMPLEMENTED YET
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
  */
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
};

const LATENCY_MS = 300;
const requiredParams = [
  'national_id_number',
  'national_id_number_country_code'
];

const optionalParams = [
  'first_name',
  'last_name',
  'address1',
  'address2',
  'city',
  'zip_code',
  'country',
  'phone_number',
  'email',
  'citizen',
  'tax_country',
  'regulation_id',
];

function* createProspect(next) {
  const requestBody = this.request.body;
  const hasRequiredParams = isKeysInObject(requiredParams, requestBody);
  const hasUnsupportedParams = doesObjectContainExtraKeys([...requiredParams, ...optionalParams], requestBody);

  if (!hasRequiredParams || hasUnsupportedParams) {
    this.body = { createProspect: 'Failed on required parameter check', missing: requiredParams };
    this.status = 400;
  } else {
    this.body = prospect;
    this.status = 200;
  }

  yield (done) => { setTimeout(done, LATENCY_MS); }; // delaying the response to simulate signicat processing.

  yield next;
}

function* updateProspect(next) {
  const requestBody = this.request.body;
  const doesProspectIdMatch = this.params.prospectId && this.params.prospectId === prospect.prospect_id; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
  const hasUnsupportedParams = doesObjectContainExtraKeys(optionalParams, requestBody);

  if (!doesProspectIdMatch || hasUnsupportedParams) {
    this.body = { updateProspect: `Prospect id valid: ${doesProspectIdMatch}, unsupported params: ${hasUnsupportedParams}.` };
    this.status = 400;
  } else {
    const data = this.request.body;
    prospect = Object.assign(prospect, data);
    this.body = {
      /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
      prospect_id: prospect.prospect_id,
      support_automatic: prospect.automatic,
      /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    };

    this.status = 200;
  }

  yield next;

  yield (done) => { setTimeout(done, LATENCY_MS); }; // delaying the response to simulate signicat processing.
}

function doesObjectContainExtraKeys(restrictedKeys, object) {
  const objectKeys = Object.keys(object);
  const hasExtraKey = !objectKeys.every(key => restrictedKeys.indexOf(key) !== -1);

  return hasExtraKey;
}

function isKeysInObject(requiredKeys, object) {
  const objectKeys = Object.keys(object);
  const objectHasKeys = requiredKeys.every(requiredKey => objectKeys.indexOf(requiredKey) !== -1);

  return objectHasKeys;
}

module.exports = {
  createProspect,
  updateProspect,
};
