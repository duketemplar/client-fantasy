const notBlankValidator = (message, value) => {
  if (value === null || value === undefined || value === '') {
    return message;
  }
  return null;
};

export default notBlankValidator;
