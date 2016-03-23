
const regexValidator = (regex, message, value) => {
  if (value === undefined) {
    return null;
  } else if (!value.match(regex)) {
    return message;
  }
  return null;
};

export default regexValidator;
