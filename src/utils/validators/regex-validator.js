
const regexValidator = (regex, message, value) => {
  if (value === undefined || !value.match(regex)) {
    return message;
  }

  return null;
};

export default regexValidator;
