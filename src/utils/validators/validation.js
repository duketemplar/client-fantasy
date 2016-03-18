function validate(object, validators) {
  return new Validation(object, validators).validate().errors;
}

class Validation {
  constructor(object, validators) {
    this.object = object;
    this.validators = validators;
    this.errors = {};
  }

  validate() {
    for (var field in this.object) {
      this.validateField(field);
    }

    return this;
  }

  validateField(field) {
    const fieldValidators = this.getValidatorsForField(field)
    if (fieldValidators === undefined) {
      return;
    }

    for (var index in fieldValidators) {
      const validator = fieldValidators[index];
      const error = validator(this.object[field])
      if (error) {
        this.errors[field] = error;
        break;
      } else {
        this.errors[field] = null;
      }
    }
  }

  getValidatorsForField(field) {
    return this.validators[field]
  }
}

export default validate;