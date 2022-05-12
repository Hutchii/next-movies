import { minLengthRule, checkBoxChecked } from "./formValidationRules";
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
      "Write poprawny email"
    ),
    validationRules: [minLengthRule("email", 3)],
  },
  fullName: {
    ...createFormInput(
      "Full name:",
      "fullName",
      "text",
      "Enter your full name",
      "Write poprawny email"
    ),
    validationRules: [minLengthRule("fullName", 3)],
  },
  message: {
    ...createFormTextarea(
      "Message:",
      "message",
      "text",
      "Enter your message",
      "Write poprawny email"
    ),
    validationRules: [minLengthRule("message", 3)],
  },
  consent: {
    ...createFormCheckbox(
      "By sending this form you accepting our terms of use!",
      "consent",
      "Write poprawny email",
      // "optional"
    ),
    validationRules: [checkBoxChecked("message", 3)],
    renderType: "checkbox",
  },
};
