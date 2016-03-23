import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
/**
 * Formats the input phone number to the pattern of ITU-T Recommendation E. 123, e.g.'+41 44 668 18 00'.
 * Return the original input, if the number is not a valid one.
 *
 * @param inputNum the input phone number
 * @param countryCode two character country code, e.g 'SE'; default to 'SE'.
 * @returns the formatted number with pattern like '+41 44 668 18 00';
 * or the original input, if the input is not a valid one.
 */
export function formatPhoneNumber(inputNum, countryCode = 'SE') {
  const phoneUtil = PhoneNumberUtil.getInstance();

  try {
    const phoneNumber = phoneUtil.parse(inputNum, countryCode);
    return phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL);
  } catch (e) {
    // parsing error
    return inputNum;
  }
}
