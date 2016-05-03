/*
 * Creates localization object with messages for provided locale.
 * It maps no-NO locale to nb-NO locale
 */
export default function l10nLoader(locale) {
  const mappedLocale = locale === 'no-NO' ? 'nb-NO' : locale;

  return {
    messages: require(`./l10n/phrase.${mappedLocale}.json`),
    locales: [mappedLocale],
  };
}
