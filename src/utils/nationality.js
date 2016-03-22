const getNationality = () => {
  const tld = window.location.hostname.substr(-2, 2).match(/(se|fi|dk|no)/);
  return tld === undefined ? tld[0] : 'se';
};

export default getNationality;
