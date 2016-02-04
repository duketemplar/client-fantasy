const civicRegistrationNumberValidator = (value) => {
  let msg;
  if (value.length > 5) {
    msg =  'Du måste minst skriva 5 tecken' + value;
  } else if (value === 'cheeze') {
    msg = 'Cheeze är inte acceptabelt';
  } else {
    msg = true;
  }

  return msg;
};

export { civicRegistrationNumberValidator };
