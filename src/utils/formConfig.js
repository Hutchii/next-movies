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
  // reCaptcha: {
  //   ...createReCaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
  //   renderType: "captcha",
  // },
  email: {
    ...createFormInput(
      "Address email:",
      "email",
      "email",
      "Enter your email address"
    ),
    validationRule: emailValidation,
    validationMessage: "1This field is required!",
  },
  fullName: {
    ...createFormInput(
      "Full name:",
      "fullName",
      "text",
      "Enter your full name"
    ),
    validationRule: nameValidation,
    validationMessage: "1This field is required!",
  },
  message: {
    ...createFormTextarea("Message:", "message", "text", "Enter your message"),
    validationRule: messageValidation,
    validationMessage: "1This field is required!",
  },
  consent: {
    ...createFormCheckbox(
      "By sending this form you accepting our terms of use!",
      "consent"
      // "optional"
    ),
    validationRule: checkboxValidation,
    validationMessage: "1This field is required!",
    renderType: "checkbox",
  },
};
