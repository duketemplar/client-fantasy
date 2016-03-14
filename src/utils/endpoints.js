/* jscs:disable maximumLineLength */
function getNordnetAPIURI(hostname) {
  const nordnetAPImap = {
    local: '/api/2',
    test: 'https://eservice-nnapi.test.nordnet.se:80/api/2',
    ci: 'https://eservice-nnapi.ci.nordnet.se:80/api/2',
  };

  const environment = encodeURI(hostname.split('.').slice(-3, -2).pop());

  return nordnetAPImap[environment] ? nordnetAPImap[environment] : nordnetAPImap.local;
}

const nordnetAPIURI = getNordnetAPIURI(location.hostname);

export default {
  getNordnetAPIURI,
  CUSTOMERS_PROSPECTS_URI: `${nordnetAPIURI}/customers/prospects`,
  MANUAL_FLOW_OPEN_ISK_PATH: '/mux/web/nordnet/blikund.html?inhibit_nc=1&depa_typ=isk&agandeskap=private',
};
