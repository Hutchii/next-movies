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
  // email: {
  //   ...createFormInput(
  //     "Address email:",
  //     "email",
  //     "email",
  //     "Enter your email address",
  //     "Email address is required!"
  //   ),
  //   validationRule: emailValidation,
  // },
  // fullName: {
  //   ...createFormInput(
  //     "Full name:",
  //     "fullName",
  //     "text",
  //     "Enter your full name",
  //     "Full name is required!"
  //   ),
  //   validationRule: nameValidation,
  // },
  message: {
    ...createFormTextarea(
      "Message:",
      "message",
      "text",
      "Enter your message",
      "Message is required!"
    ),
    validationRule: messageValidation,
  },
  // consent: {
  //   ...createFormCheckbox(
  //     "Accept terms of use.",
  //     "consent",
  //     "You have to accept terms of use!"
  //   ),
  //   validationRule: checkboxValidation,
  //   renderType: "checkbox",
  // },
};
