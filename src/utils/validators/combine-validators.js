const combineValidators = (fieldsValidators) => {
  return (values) => {
    const errors = {};

    Object.keys(fieldsValidators).forEach((key) => {
      fieldsValidators[key].some(validationSpec => {
        const error = validationSpec[0].bind(null, ...validationSpec.slice(1))(values[key]);

        if (error) {
          errors[key] = error;
          return true;
        }
      });
    });

    return errors;
  };
};

export default combineValidators;
