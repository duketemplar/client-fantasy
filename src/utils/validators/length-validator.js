import { isEmptyValue } from './is-empty-value';

const lengthValidator = (maxLength, errorMessage, value) => {
  const valueLength = value.toString().length;
  if (isEmptyValue(value)) {
    return null;
  } else if (valueLength < maxLength) {
    return errorMessage;
  }
  return null;
};

export default lengthValidator;
