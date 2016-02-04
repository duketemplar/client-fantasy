const lengthValidator = (value, length) => {
  if (value.length > length) {
    return 'Måste vara minst ' + length + ' tecken.';
  }
};

export { lengthValidator };
