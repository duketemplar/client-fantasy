const DEFAULT_LATENCY_MS = 300;

function delayResponse(milliSeconds) {
  if (!milliSeconds) {
    milliSeconds = DEFAULT_LATENCY_MS;
  }

  return done => setTimeout(done, milliSeconds);
}

function doesObjectContainExtraKeys(restrictedKeys, object) {
  const objectKeys = Object.keys(object);
  const hasExtraKey = !objectKeys.every(key => restrictedKeys.indexOf(key) !== -1);

  return hasExtraKey;
}

function isKeysInObject(requiredKeys, object) {
  const objectKeys = Object.keys(object);
  const objectHasKeys = requiredKeys.every(requiredKey => objectKeys.indexOf(requiredKey) !== -1);

  return objectHasKeys;
}

module.exports = {
  delayResponse,
  doesObjectContainExtraKeys,
  isKeysInObject,
};
