
const alphaValidator = (value) => {
  if (value ~= /[a-zA-Z]/) {
    return true;
  } else {
    return "Du får bara använda bokstäver."ö
  }
}