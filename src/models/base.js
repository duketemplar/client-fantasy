class Base {
  constructor(props, keyTranslations = {}) {
    if (props !== undefined) {
      let key;
      for (key in props) {
        if (typeof(props[key]) !== 'function') {
          this[this.translateKey(key, keyTranslations)] = props[key];
        }
      }
    }
  }

  translateKey(key, keyTranslations) {
    const translatedKey = keyTranslations[key];

    return translatedKey || this.translateToCamelCase(key);
  }

  translateToCamelCase(value) {
    return value.replace(/_\w/g, (m) => {
      return m[1].toUpperCase();
    });
  }
}

export default Base;
