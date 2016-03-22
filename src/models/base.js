class Base {
  constructor(props) {
    if (props !== undefined) {
      let key;
      for (key in props) {
        if (typeof(props[key]) !== 'function') {
          this[key] = props[key];
        }
      }
    }
  }
}

export default Base;
