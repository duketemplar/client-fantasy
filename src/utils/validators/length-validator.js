
const lengthValidator = (length, errorMessage, value) => {
  if (!value) {
    return null;
  } else if (value.length < length) {
    return errorMessage;
  }
  return null;
};

export default lengthValidator;
