/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
const helpers = require('../helpers');

const validStructure = {
  address_country: 'String',
  customer_type: 'String',
  jurisdiction: 'String',
  tax_info: {
    atyids: [
      'Int',
    ],
    birth_country: 'String',
    birth_place: 'String',
    default_tax_country: 'String',
    entity_type: 'String',
    giin: 'String',
    is_financial_institute: 'Boolean',
    jurisdictions: [
      {
        country: 'String',
        tax_identification_number: 'String',
      },
      {
        country: 'String',
        tax_identification_number: 'String',
      },
      {
        country: 'String',
        tax_identification_number: 'String',
      },
    ],
    taxable_in_jurisdiction: 'Boolean',
    taxable_outside_jurisdiction: 'Boolean',
  },
};

function* validateRegulation(next) {
  const requestData = this.request.body;

  if (!requestData.tax_info || !requestData.tax_info.taxable_outside_jurisdiction) {
    this.status = 400;
    this.body = { fail: 'Missing tax_info.taxable_outside_jurisdiction' };
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
