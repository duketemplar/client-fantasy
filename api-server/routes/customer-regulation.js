/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
/* jscs:disable maximumLineLength */
const helpers = require('../helpers');

const validStructure = {
  address_country: 'dk',
  customer_type: 'individual',
  jurisdiction: 'se',
  kyc: {
    economic_origin: 'string',
    employment_classification: 'string',
    savings_purpose: 'string',
    yearly_income: 0,
    yearly_income_currency: 'sek',
    yearly_insert: 0,
    yearly_insert_currency: 'sek',
  },
  pep: {
    is_pep: true,
  },
  tax_info: {
    atyids: [
      1,
    ],
    birth_country: 'dk',
    birth_place: 'string',
    default_tax_country: 'dk',
    entity_type: 'active',
    giin: 'string',
    is_financial_institute: true,
    jurisdictions: [
      {
        country: 'dk',
        tax_identification_number: 'string',
      },
    ],
    taxable_in_jurisdiction: true,
    taxable_outside_jurisdiction: true,
  },
};

function* validateRegulation(next) {
  const requestData = this.request.body;

  let hasRequiredParams = false;
  if (requestData.tax_info) {
    hasRequiredParams = helpers.isKeysInObject(['taxable_outside_jurisdiction'], requestData.tax_info);
  } else if (requestData.pep) {
    hasRequiredParams = helpers.isKeysInObject(['is_pep'], requestData.pep);
  }

  if (!hasRequiredParams) {
    this.status = 400;
    this.body = { fail: 'Missing required parameter.' };
  } else {
    this.staus = 200;
    this.body = {
      regulation_id: 'aa6aa4bc-5ba9-404e-8f9c-74c1a1bce48d',
    };
  }

  yield next;

  yield helpers.delayResponse();
}

module.exports = {
  validateRegulation,
};
