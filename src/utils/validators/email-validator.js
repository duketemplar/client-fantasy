import { isEmptyValue } from './';
// Empty values are handled by required-field-validator

const emailValidator = (errorMessage, email) => {
  if (isEmptyValue(email)) {
    return null;
  } else if (!email.match(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.+-]+\.[a-zA-Z]{2,4}$/)) {
    return errorMessage;
  }
  return null;
};
export default emailValidator;
