const civicRegistrationNumberValidator = value => {
  if (value.length > 5) {
    return "Du måste minst skriva 5 tecken";
  } else if (value == 'cheeze') {
    return "Cheeze är inte acceptabelt";
  } else {
    return true;
  }
};

export default civicRegistrationNumberValidator;