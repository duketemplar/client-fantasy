import { isEmptyValue } from './';

const lengthValidator = (minLength, errorMessage, value) => {
  if (isEmptyValue(value) || typeof(value) === 'boolean' || value.toString().length < minLength) {
    return errorMessage;
  }
  return null;
};

export default lengthValidator;
