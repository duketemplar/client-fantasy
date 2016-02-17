
const lengthValidator = (length, message, value) => {
  if (value === undefined || value.length < length) {
    return message;
  }
  return null;
};

export default lengthValidator;
