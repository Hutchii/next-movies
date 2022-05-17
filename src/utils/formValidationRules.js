export const emailValidation = (value) => {
  if (!value) return "This field is required!";
  if (
    !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
      value
    )
  )
    return "Please enter valid email address!";
  return null;
};
export const nameValidation = (value) => {
  if (!value) return "This field is required!";
  if (!/[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}/g.test(value))
    return "Please enter your full name!";
  return null;
};
export const messageValidation = (value) => {
  if (!value) return "This field is required!";
  if (!/[a-zA-Z]{3,}/g.test(value))
    return "Mesage field can not be empty!";
  return null;
};
export const checkboxValidation = (value) => {
  if (!value) return "You have to agree with our terms of use!";
  return null;
};
