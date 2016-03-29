// yyyymmdd-xxxx yymmdd-xxxx yyyymmddxxxx yymmddxxxx with luhn algorithm
export function isValidCivicRegnoSE(pno) {
  let input = pno;

  // Check valid length & form
  if (!input) {
    return false;
  }

  if (input.indexOf('-') === -1) {
    if (input.length === 10) {
      input = input.slice(0, 6) + '-' + input.slice(6);
    } else {
      input = input.slice(0, 8) + '-' + input.slice(8);
    }
  }

  if (!input.match(/^(\d{2})(\d{2})(\d{2})\-(\d{4})|(\d{4})(\d{2})(\d{2})\-(\d{4})$/)) {
    return false;
  }

  // Clean input
  input = input.replace('-', '');
  if (input.length === 12) {
    input = input.substring(2);
  }

  // Declare variables
  const d = new Date(((!!RegExp.$1) ? RegExp.$1 : RegExp.$5),
    (((!!RegExp.$2) ? RegExp.$2 : RegExp.$6) - 1), ((!!RegExp.$3) ? RegExp.$3 : RegExp.$7));
  let sum = 0;
  const numdigits = input.length;
  const parity = numdigits % 2;
  let i;
  let digit;

  // Check valid date
  if (Object.prototype.toString.call(d) !== '[object Date]' || isNaN(d.getTime())) return false;

  // Check luhn algorithm
  for (i = 0; i < numdigits; i = i + 1) {
    digit = parseInt(input.charAt(i), 10);
    if (i % 2 === parity) {
      digit *= 2;
    }

    if (digit > 9) {
      digit -= 9;
    }

    sum += digit;
  }

  return (sum % 10) === 0;
}
