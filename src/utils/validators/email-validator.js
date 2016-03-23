const emailValidator = (errorMessage, email) => {
  if (!email || !email.match(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.+-]+\.[a-zA-Z]{2,4}$/)) {
    return errorMessage;
  }
  return null;
};
export default emailValidator;
