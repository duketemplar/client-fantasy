import { isEmptyValue } from './is-empty-value';

const isMandatory = (message, value) => {
  if (isEmptyValue(value)) {
    return message;
  }
  return null;
};
export default isMandatory;
