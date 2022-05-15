function createValidationRule(errorMessage, validateFn) {
  return {
    message: errorMessage,
    validate: validateFn,
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
  return createValidationRule(`Please enter your full name!`, (inputValue) =>
    /[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}/g.test(inputValue)
  );
}
export function messageValidation() {
  return createValidationRule(`Mesage field can not be empty!`, (inputValue) =>
    /[a-zA-Z]{3,}/g.test(inputValue)
  );
}
export function checkBoxValidation() {
  return createValidationRule(`You have to agree with our terms of use!`, (inputValue) => inputValue);
}
