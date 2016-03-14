function getNordnetAPIURI(hostname) {
  const nordnetAPImap = {
    local: '/api/2',
    test: 'http://eservice-nnapi.test.nordnet.se:80/api/2',
    ci: 'http://eservice-nnapi.ci.nordnet.se:80/api/2',
  };

  const environment = encodeURI(hostname.split('.').slice(-3, -2).pop());

  return nordnetAPImap[environment] ? nordnetAPImap[environment] : nordnetAPImap.local;
}

const nordnetAPIURI = getNordnetAPIURI(location.hostname);

export default {
  getNordnetAPIURI,
  CUSTOMER_CREATION_URI: `${nordnetAPIURI}/customer-creation`,
};
