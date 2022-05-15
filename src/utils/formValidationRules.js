function createValidationRule(errorMessage, validateFunc) {
  return {
    message: errorMessage,
    validate: validateFunc,
  };
}

export function emailValidation() {
  return createValidationRule(`Please enter a valid email address!`, (inputValue) =>
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
      inputValue
    )
  );
}
export function nameValidation() {
  return createValidationRule(`Message`, (inputValue) =>
    /[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}/g.test(inputValue)
  );
}
export function messageValidation() {
  return createValidationRule(`Message`, (inputValue) =>
    /[a-zA-Z]{3,}/g.test(inputValue)
  );
}
export function checkBoxValidation() {
  return createValidationRule(`Message`, (inputValue) => inputValue);
}
