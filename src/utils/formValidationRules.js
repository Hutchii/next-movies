export const emailValidation = (
  value,
  message = "Email address is required!"
) => {
  if (!value) return message;
  if (
    !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
      value
    )
  )
    return "That`s not a valid email address.";
  return null;
};
export const nameValidation = (value, message = "Full name is required!") => {
  if (!value) return message;
  if (!/[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}/g.test(value))
    return "That`s not a valid full name.";
  return null;
};
export const messageValidation = (value, message = "Message is required!") => {
  if (!value) return message;
  if (!/[a-zA-Z]{6,}/g.test(value)) return "Your message must be at least 6 characters.";
  return null;
};
export const checkboxValidation = (
  value,
  message = "You have to accept terms of use!"
) => {
  if (!value) return message;
  return null;
};
