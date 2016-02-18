const emailValidator = (message, value) => {
  if (value === null || value === undefined)
    return null;

  if (value.length < 5) {
    return message;
  }

  return null;
}

export default emailValidator;
