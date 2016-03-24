import libPhoneNumber from 'google-libphonenumber';
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();

export function validatePhonenumber(number, countryCode = 'SE') {
  let parsedNumber;
  try {
    parsedNumber = phoneUtil.parse(number, countryCode);
  } catch (err) {
    // not parsable e.g "what ever" or "+010987989"(without SE country code)
    return false;
  }
  return phoneUtil.isValidNumber(parsedNumber);
}
