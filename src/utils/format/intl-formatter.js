export function intlFormatter(intl, value) {
  if (!value || !intl) {
    return null;
  }
  return intl(value);
}
