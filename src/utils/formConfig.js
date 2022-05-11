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
      "Enter your email address"
    ),
    validationRules: [minLengthRule("email", 3)],
  },
  fullName: {
    ...createFormInput(
      "Full name:",
      "fullName",
      "text",
      "Enter your full name"
    ),
    validationRules: [minLengthRule("fullName", 3)],
  },
  message: {
    ...createFormTextarea("Message:", "message", "text", "Enter your message"),
    validationRules: [minLengthRule("message", 3)],
  },
  consent: {
    ...createFormCheckbox(
      "By sending this form you accepting our terms of use!",
      "consent"
    ),
    validationRules: [checkBoxChecked("message", 3)],
    renderType: "checkbox",
  },
};
