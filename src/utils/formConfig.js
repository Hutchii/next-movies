import {
  emailValidation,
  nameValidation,
  messageValidation,
  checkBoxValidation,
} from "./formValidationRules";
import {
  createFormInput,
  createFormTextarea,
  createFormCheckbox,
} from "./formElements";

export const form = {
  email: {
    ...createFormInput(
      "Address email:",
      "email",
      "email",
      "Enter your email address",
    ),
    validationRule: emailValidation(),
  },
  fullName: {
    ...createFormInput(
      "Full name:",
      "fullName",
      "text",
      "Enter your full name",
    ),
    validationRule: nameValidation(),
  },
  message: {
    ...createFormTextarea(
      "Message:",
      "message",
      "text",
      "Enter your message",
    ),
    validationRule: messageValidation(),
  },
  consent: {
    ...createFormCheckbox(
      "By sending this form you accepting our terms of use!",
      "consent",
      // "optional"
    ),
    validationRule: checkBoxValidation(),
    renderType: "checkbox",
  },
};
