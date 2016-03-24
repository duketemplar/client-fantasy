module.exports = (client) => {
  return {
    pickKF() {
      return client
        .click('.pick-account__answer--kf');
    },
    pickISK() {
      return client
        .click('.pick-account__answer--isk');
    },
    pickAF() {
      return client
        .click('.pick-account__answer--af');
    },
  };
};
