import { isEmptyValue } from './is-empty-value';

const requiredFieldValidator = (message, value) => {
  if (isEmptyValue(value)) {
    return message;
  }
  return null;
};
export default requiredFieldValidator;
