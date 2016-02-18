
const lengthValidator = (length, message, value) => {
  if (value === undefined) {
    return null;
  }

  if (value.length < length) {
    return message;
  }

  return null;
};

export default lengthValidator;
