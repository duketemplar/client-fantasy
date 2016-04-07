module.exports = (client) => {
  return {
    doContinue() {
      return client
        .click('.info-modal__container .btn-primary');
    },

    doCancel() {
      return client
        .click('.info-modal__container .btn-secondary');
    },
  };
};
