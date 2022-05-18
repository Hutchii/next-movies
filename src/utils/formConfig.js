import {
  emailValidation,
  nameValidation,
  messageValidation,
  checkboxValidation,
} from "./formValidationRules";
import {
  createFormInput,
  createFormTextarea,
  createFormCheckbox,
  createReCaptcha,
} from "./formElements";

export const form = {
  reCaptcha: {
    ...createReCaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
    renderType: "captcha",
  },
  email: {
    ...createFormInput(
      "Address email:",
      "email",
      "email",
      "Enter your email address",
      "This field is required!"
    ),
    validationRule: emailValidation,
  },
  fullName: {
    ...createFormInput(
      "Full name:",
      "fullName",
      "text",
      "Enter your full name",
      "This field is required!"
    ),
    validationRule: nameValidation,
  },
  message: {
    ...createFormTextarea(
      "Message:",
      "message",
      "text",
      "Enter your message",
      "This field is required!"
    ),
    validationRule: messageValidation,
  },
  consent: {
    ...createFormCheckbox(
      "By sending this form you accepting our terms of use!",
      "consent",
      "This field is required!"
    ),
    validationRule: checkboxValidation,
    renderType: "checkbox",
  },
};
