export function emailValidation(value, label) {
  if (!value) return `${label} is required!`;
  if (
    !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
      value
    )
  ) {
    return "You have to write a proper address email!";
  }
  return null;
}

export function nameValidation(value, label) {
  if (!value) return `${label} is required!`;
  if (!/[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}/g.test(value)) {
    return "You have to write a proper full name!";
  }
  return null;
}

export function messageValidation(value, label) {
  if (!value) return `${label} is required!`;
  if (!/[a-zA-Z]{3,}/g.test(value)) {
    return "You have to write a proper full name!";
  }
  return null;
}

export function checkboxValidation(value, label) {
  if (!value) return `${label} is required!`;
  return null;
}
