import api from 'nordnet-next-api';

export default function getLocale(element) {
  const lang = element.getAttribute('data-lang');
  const country = element.getAttribute('data-country');

  if (lang && country) {
    return Promise.resolve(`${lang}-${country}`);
  }

  return api.get('/api/2/login').then(({ data }) => `${data.lang}-${data.country}`);
}
