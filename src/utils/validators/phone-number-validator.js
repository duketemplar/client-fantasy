import libPhoneNumber from 'google-libphonenumber';
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
import { isEmptyValue } from './is-empty-value';

export function validatePhonenumber(errorMessage, number, countryCode = 'SE') {
  if (isEmptyValue(number)) {
    return null;
  }
  let parsedNumber;
  try {
    parsedNumber = phoneUtil.parse(number, countryCode);
  } catch (err) {
    // not parsable e.g "what ever" or "+010987989"(without SE country code)
    return errorMessage;
  }
  if (!phoneUtil.isValidNumber(parsedNumber)) {
    return errorMessage;
  }
  return null;
}
