import { isEmptyValue } from './is-empty-value';

const lengthValidator = (minLength, errorMessage, value) => {
  if (isEmptyValue(value) || typeof(value) === 'boolean' || value.toString().length < minLength) {
    return errorMessage;
  }
  return null;
};

export default lengthValidator;
