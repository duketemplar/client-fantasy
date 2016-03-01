import api from 'nordnet-next-api';

function getLocaleFromHost() {
  const topDomain = encodeURI(location.hostname.split('.').pop());
  const domainLocale = {
    se: 'sv-SE',
    dk: 'da-DK',
    fi: 'fi-FI',
    no: 'nn-NO',
  };

  return domainLocale[topDomain] ? domainLocale[topDomain] : domainLocale.se;
}

export default function getLocale(element) {
  const lang = element.getAttribute('data-lang');
  const country = element.getAttribute('data-country');

  if (lang && country) {
    return Promise.resolve(`${lang}-${country}`);
  }

  return api
  .get('/api/2/login')
  .then(({ data }) => `${data.lang}-${data.country}`)
  .catch((error) => {
    console.log('Failed to load locale via next: ', error.message, '...getting it from hostname instead'); // eslint-disable-line no-console
    return getLocaleFromHost();
  });
}
