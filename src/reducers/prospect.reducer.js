import { RECEIVED_PROSPECT, CREATE_PROSPECT, CHANGE_PROSPECT } from '../actions';
import { nationalRegistrationNumberValidator, emailValidator, notBlankValidator, regexValidator, lengthValidator, validate } from '../utils/validators';

function meta(state = {}, action) {
  if (action.type === 'PROSPECT_CREATED') {
      return action.value;
  }

  return state;
}

function prospect(state = { national_id_number_country_code: getNationality() }, action) {
  switch (action.type) {
    case RECEIVED_PROSPECT:
      return Object.assign({}, state, action.prospect);
    case CHANGE_PROSPECT:
      return Object.assign({}, state, action.fieldsToChange);
    default:
      return state;
  }

  return state;
}

function prospect_validations(state = {}, action) {
  if (action.type !== CHANGE_PROSPECT) {
    return state;
  }

  return Object.assign({}, state, validate(action.fieldsToChange, validators));
}

const getNationality = () => {
  const tld = window.location.hostname.substr(-2, 2).match(/(se|fi|dk|no)/);
  return tld === undefined ? tld[0] : 'se';
};

const validators = {
  natRegNo: [
    (value) => nationalRegistrationNumberValidator(getNationality(), "Must be a real national registration number", value),
    (value) => notBlankValidator("Must be filled in.", value),
  ],
  email: [
    (value) => notBlankValidator("Must be filled in.", value),
    (value) => emailValidator("not a valid email", value),
  ],
  firstName: [
    (value) => regexValidator(/^[a-zA-Z.\s]+$/, "Must only contain letters", value),
    (value) => notBlankValidator("Must be filled in.", value),
    (value) => lengthValidator(3, "Must be at least 2 characters.", value),
  ],
  lastName: [
    (value) => notBlankValidator("Must be filled in.", value),
    (value) => lengthValidator(3, "Must be at least 2 characters.", value),
  ],
  zip: [
    (value) => notBlankValidator("Must be filled in.", value),
    (value) => lengthValidator(4, "Must be at least 3 characters.", value),
  ],
  city: [
    (value) => notBlankValidator("Must be filled in.", value),
    (value) => lengthValidator(3, "Must be at least 2 characters.", value),
  ],
  address1: [
    (value) => notBlankValidator("Must be filled in.", value),
    (value) => lengthValidator(3, "Must be at least 2 characters.", value),
  ],
  address2: [
    (value) => notBlankValidator("Must be filled in.", value),
    (value) => lengthValidator(3, "Must be at least 2 characters.", value),
  ],
  natregno: [
    (value) => notBlankValidator("Must be filled in.", value),
  ],
  citizen: [
    (value) => notBlankValidator("Must be filled in.", value),
  ],
  country: [
    (value) => notBlankValidator("Must be filled in.", value),
  ],
}

export default {
  prospect,
  meta,
  prospect_validations,
}
