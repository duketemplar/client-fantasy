import { PhoneNumberUtil, AsYouTypeFormatter } from 'google-libphonenumber';

// format the given number (optionally add any formatting suffix e.g. a hyphen)
function formatNumber(val, countryCode, addSuffix, allowExtension, isAllowedKey) {
  try {
    const formatter = new AsYouTypeFormatter(countryCode);
    const extSuffix = ' ext. ';

    let next;
    let clean = val.replace(/\D/g, '');
    let result = '';

    if (val.substr(0, 1) === '+') {
      clean = '+' + clean;
    }

    // got through the clean number, formatting as we go (keeping an eye out for where the extension starts, if there is one)
    for (let i = 0; i < clean.length; i++) {
      // TODO: improve this so don't just pump in every digit every time - we should just cache this formatter object, and just call inputDigit once each time the user enters a new digit
      next = formatter.inputDigit(clean.charAt(i));

      if (allowExtension && result && next.length <= result.length && next.indexOf(' ') === -1 && getValidationError(clean.substring(0, i - 1), countryCode) !== PhoneNumberUtil.ValidationResult.TOO_SHORT) {
        // if we're allowing extensions and adding this digit didn't change the length, or made it smaller (and there's no longer any spaces), and the number is not TOO_SHORT: that means the number was no longer a potentially valid number, so assume the rest is the extension
        return result + extSuffix + clean.substring(i, clean.length);
      }

      result = next;
    }

    // for some reason libphonenumber formats "+44" to "+44 ", but doesn't do the same with "+1"
    if (result.charAt(result.length - 1) === ' ') {
      result = result.substr(0, result.length - 1);
    }

    // try adding one more (fake) digit to determine if we should add a formatting suffix, or an ext suffix
    if (addSuffix && !val.split(extSuffix)[1]) {
      // hack to get formatting suffix
      let test = formatter.inputDigit('5');

      // again the "+44 " problem... (also affects "+45" apparently)
      if (test.charAt(test.length - 1) === ' ') {
        test = test.substr(0, test.length - 1);
      }

      // we want to know if adding a '5' introduced a formatting char, so we check if the penultimate char (the one before this new '5') is not-a-number
      const penultimate = test.substr(test.length - 2, 1);

      // Note: never use isNaN without parseFloat
      if (isNaN(parseFloat(penultimate))) {
        // return the new value (minus that last '5' we just added)
        return test.substr(0, test.length - 1);
      } else if (
        allowExtension &&
        result &&
        test.length <= result.length &&
        test.indexOf(' ') === -1 &&
        getValidationError(clean.substring(0, i - 1), countryCode) !== PhoneNumberUtil.ValidationResult.TOO_SHORT &&
        !isAllowedKey) {
        // else check for the case where the user already had a full valid number, and they have just hit space or 'e' (etc.) to try and add an extension - in which case we add the ext suffix.
        //
        // so we check if we're allowing extensions, and if adding this extra '5' to the number broke the formatting, and the number is not TOO_SHORT (i.e. they already have a full valid number), AND this is not an allowed key
        //
        // NOTE: we don't automatically add the ext suffix when the user finishes typing a full valid number - only when they add an extra digit (this situation is caught in the initial loop above), or if they try typing the ext suffix themselves (hance the check that this was not an allowed key)
        return result + extSuffix;
      }
    }

    return result;
  } catch (e) {
    return val;
  }
}

export { formatNumber };
