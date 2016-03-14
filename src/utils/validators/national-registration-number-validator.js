const seValidator = (value) => {
  return value.match(/^(\d{6,8})-?\d{4}$/);
};

const dkValidator = (value) => {
  return value.match(/^(\d{6})-?\d{4}$/);
};

const fiValidator = (value) => {
  return value.match(/^\d{6}-?\d{3}[0-9a-zA-Z]{1}$/);
};

const noValidator = (value) => {
  return value.match(/^(\d{6})-?\d{5}$/);
};

const validators = { se: seValidator, dk: dkValidator, no: noValidator, fi: fiValidator };

const lengthValidator = (nationality, message, value) => {
  if (value === undefined || value === '' || value === null || nationality === undefined) {
    return null;
  }

  if (!validators[nationality](value, message)) {
    return message;
  }

  return null;
};

export default lengthValidator;
