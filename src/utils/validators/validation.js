class Validation {
  constructor(object, validators) {
    this.object = object;
    this.validators = validators;
    this.errors = {};
  }

  validate() {
    let field;
    for (field in this.object) {
      if (!typeof(field) !== 'function') {
        this.validateField(field);
      }
    }

    return this;
  }

  validateField(field) {
    let index;
    const fieldValidators = this.getValidatorsForField(field);
    if (fieldValidators === undefined) {
      return;
    }

    for (index in fieldValidators) {
      if (index === undefined) {
        return;
      }

      const validator = fieldValidators[index];
      const error = validator(this.object[field]);
      if (error) {
        this.errors[field] = error;
        break;
      } else {
        this.errors[field] = null;
      }
    }
  }

  getValidatorsForField(field) {
    return this.validators[field];
  }
}

function validate(object, validators) {
  return new Validation(object, validators).validate().errors;
}

export default validate;
