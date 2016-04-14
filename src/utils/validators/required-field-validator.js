import { isEmptyValue } from './';

const requiredFieldValidator = (message, value) => {
  if (isEmptyValue(value)) {
    return message;
  }
  return null;
};
export default requiredFieldValidator;
