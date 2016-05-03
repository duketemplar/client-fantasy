import getLocale from './get-locale';
import { initializeLocale, supportedLocales } from './initialize-intl';
import i18n from './i18n.jsx';
import translatable from './translatable';

export default {
  initialize: (element) => getLocale(element).then(initializeLocale),
  i18n,
  supportedLocales,
  translatable,
};
