const isMandatory = (message, value) => {
  if (value) {
    return null;
  }
  return message;
};
export default isMandatory;
