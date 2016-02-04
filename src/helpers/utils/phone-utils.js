import { PhoneNumberFormat, PhoneNumberUtil, AsYouTypeFormatter } from 'google-libphonenumber';

// get an example number for the given country code
function getExampleNumber(countryCode, national, numberType) {
  try {
    var phoneUtil = PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.getExampleNumberForType(countryCode, numberType);
    var format = (national) ? PhoneNumberFormat.NATIONAL : PhoneNumberFormat.INTERNATIONAL;
    return phoneUtil.format(numberObj, format);
  } catch (e) {
    return "";
  }
}


// format the given number to the given type
function formatNumberByType(number, countryCode, type) {
  try {
    var phoneUtil = PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    type = (typeof type == "undefined") ? PhoneNumberFormat.E164 : type;
    return phoneUtil.format(numberObj, type);
  } catch (e) {
    console.log(e);
    return "";
  }
}


// check if given number is valid
function isValidNumber(number, countryCode) {
  try {
    var phoneUtil = PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isValidNumber(numberObj);
  } catch (e) {
    return false;
  }
}


// get more info if the validation has failed e.g. too long/too short
function getValidationError(number, countryCode) {
  try {
    var phoneUtil = PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.isPossibleNumberWithReason(numberObj);
  } catch (e) {
    //console.log(e);

    // here I convert thrown errors into ValidationResult enums (if possible)
    if (e == Error.INVALID_COUNTRY_CODE) {
      return PhoneNumberUtil.ValidationResult.INVALID_COUNTRY_CODE;
    }
    if (e == Error.NOT_A_NUMBER) {
      return 4;
    }
    if (e == Error.TOO_SHORT_AFTER_IDD || e == Error.TOO_SHORT_NSN) {
      return PhoneNumberUtil.ValidationResult.TOO_SHORT;
    }
    if (e == Error.TOO_LONG) {
      return PhoneNumberUtil.ValidationResult.TOO_LONG;
    }

    // broken
    return -99;
  }
}


// format the given number (optionally add any formatting suffix e.g. a hyphen)
function formatNumber(val, countryCode, addSuffix, allowExtension, isAllowedKey) {
  try {
    var clean = val.replace(/\D/g, ""),
      // NOTE: we use AsYouTypeFormatter because the default format function can't handle incomplete numbers e.g. "+17024" formats to "+1 7024" as opposed to "+1 702-4"
      formatter = new AsYouTypeFormatter(countryCode),
      // if clean is empty, we still need this to be a string otherwise we get errors later
      result = "",
      next,
      extSuffix = " ext. ";

    if (val.substr(0, 1) == "+") {
      clean = "+" + clean;
    }



    // got through the clean number, formatting as we go (keeping an eye out for where the extension starts, if there is one)
    for (var i = 0; i < clean.length; i++) {
      // TODO: improve this so don't just pump in every digit every time - we should just cache this formatter object, and just call inputDigit once each time the user enters a new digit
      next = formatter.inputDigit(clean.charAt(i));

      if (allowExtension && result && next.length <= result.length && next.indexOf(" ") == -1 && getValidationError(clean.substring(0, i - 1), countryCode) != PhoneNumberUtil.ValidationResult.TOO_SHORT) {
        // if we're allowing extensions and adding this digit didn't change the length, or made it smaller (and there's no longer any spaces), and the number is not TOO_SHORT: that means the number was no longer a potentially valid number, so assume the rest is the extension
        return result + extSuffix + clean.substring(i, clean.length);
      }
      result = next;
    }
    // for some reason libphonenumber formats "+44" to "+44 ", but doesn't do the same with "+1"
    if (result.charAt(result.length - 1) == " ") {
      result = result.substr(0, result.length - 1);
    }



    // try adding one more (fake) digit to determine if we should add a formatting suffix, or an ext suffix
    if (addSuffix && !val.split(extSuffix)[1]) {
      // hack to get formatting suffix
      var test = formatter.inputDigit('5');
      // again the "+44 " problem... (also affects "+45" apparently)
      if (test.charAt(test.length - 1) == " ") {
        test = test.substr(0, test.length - 1);
      }
      // we want to know if adding a '5' introduced a formatting char, so we check if the penultimate char (the one before this new '5') is not-a-number
      var penultimate = test.substr(test.length - 2, 1);
      // Note: never use isNaN without parseFloat
      if (isNaN(parseFloat(penultimate))) {
        // return the new value (minus that last '5' we just added)
        return test.substr(0, test.length - 1);
      } else if (allowExtension && result && test.length <= result.length && test.indexOf(" ") == -1 && getValidationError(clean.substring(0, i - 1), countryCode) != PhoneNumberUtil.ValidationResult.TOO_SHORT && !isAllowedKey) {
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
    console.log(e);
    return val;
  }
}


// get the type of the given number e.g. fixed-line/mobile
function getNumberType(number, countryCode) {
  try {
    var phoneUtil = PhoneNumberUtil.getInstance();
    var numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    return phoneUtil.getNumberType(numberObj)
  } catch (e) {
    // broken
    return -99;
  }
}


// copied this from PhoneNumberType in https://code.google.com/p/libphonenumber/source/browse/trunk/javascript/i18n/phonenumbers/phonenumberutil.js and put the keys in quotes to force closure compiler to preserve the keys
// TODO: there must be a way to just tell closure compiler to preserve the keys on PhoneNumberType and just export that
var numberType = {
  "FIXED_LINE": 0,
  "MOBILE": 1,
  // In some regions (e.g. the USA), it is impossible to distinguish between
  // fixed-line and mobile numbers by looking at the phone number itself.
  "FIXED_LINE_OR_MOBILE": 2,
  // Freephone lines
  "TOLL_FREE": 3,
  "PREMIUM_RATE": 4,
  // The cost of this call is shared between the caller and the recipient, and
  // is hence typically less than PREMIUM_RATE calls. See
  // http://en.wikipedia.org/wiki/Shared_Cost_Service for more information.
  "SHARED_COST": 5,
  // Voice over IP numbers. This includes TSoIP (Telephony Service over IP).
  "VOIP": 6,
  // A personal number is associated with a particular person, and may be routed
  // to either a MOBILE or FIXED_LINE number. Some more information can be found
  // here: http://en.wikipedia.org/wiki/Personal_Numbers
  "PERSONAL_NUMBER": 7,
  "PAGER": 8,
  // Used for 'Universal Access Numbers' or 'Company Numbers'. They may be
  // further routed to specific offices, but allow one number to be used for a
  // company.
  "UAN": 9,
  // Used for 'Voice Mail Access Numbers'.
  "VOICEMAIL": 10,
  // A phone number is of type UNKNOWN when it does not fit any of the known
  // patterns for a specific region.
  "UNKNOWN": -1
};


// copied this from PhoneNumberUtil.ValidationResult in https://code.google.com/p/libphonenumber/source/browse/trunk/javascript/i18n/phonenumbers/phonenumberutil.js and again put the keys in quotes.
// Also: added NOT_A_NUMBER to match Error.NOT_A_NUMBER
var validationError = {
  "IS_POSSIBLE": 0,
  "INVALID_COUNTRY_CODE": 1,
  "TOO_SHORT": 2,
  "TOO_LONG": 3,
  "NOT_A_NUMBER": 4
};

// copied this from https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js#L883
var numberFormat = {
  "E164": 0,
  "INTERNATIONAL": 1,
  "NATIONAL": 2,
  "RFC3966": 3
};

export { getExampleNumber, formatNumberByType, isValidNumber, getValidationError, formatNumber, getNumberType };
