import Input from "../components/Form/input";
import Textarea from "../components/Form/textarea";
import Checkbox from "../components/Form/checkbox";
import ReCAPTCHA from "react-google-recaptcha";

export function createFormInput(
  label,
  name,
  type,
  placeholder,
  defaultValue = ""
) {
  return {
    renderInput: (onChangeHandler, onBlurHandler, value, isTouched, error, wasSubmitted) => {
      return (
        <Input
          key={label}
          name={name}
          type={type}
          label={label}
          value={value}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          error={error}
          isTouched={isTouched}
          placeholder={placeholder}
          wasSubmitted={wasSubmitted}
        />
      );
    },
    value: defaultValue,
    error: "This field is required",
    isTouched: false,
  };
}

export function createFormTextarea(
  label,
  name,
  type,
  placeholder,
  defaultValue = ""
) {
  return {
    renderInput: (
      onChangeHandler,
      onBlurHandler,
      value,
      isTouched,
      error,
      wasSubmitted
    ) => {
      return (
        <Textarea
          key={label}
          name={name}
          type={type}
          label={label}
          value={value}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          error={error}
          isTouched={isTouched}
          placeholder={placeholder}
          wasSubmitted={wasSubmitted}
        />
      );
    },
    value: defaultValue,
    error: "This field is required",
    isTouched: false,
  };
}

export function createFormCheckbox(
  label,
  name,
  optional = false,
  defaultValue = false
) {
  return {
    renderInput: (onChangeHandler, value, isTouched, error, wasSubmitted) => {
      return (
        <Checkbox
          key={label}
          name={name}
          label={label}
          value={value}
          onChangeHandler={onChangeHandler}
          isTouched={isTouched}
          optional={optional}
          error={error}
          wasSubmitted={wasSubmitted}
        />
      );
    },
    value: defaultValue,
    error: "This field is required",
    isTouched: false,
    optional: false,
  };
}

export function createReCaptcha(sitekey) {
  return {
    renderInput: (ref, onChangeHandler) => {
      return (
        <ReCAPTCHA
          key="captcha"
          ref={ref}
          size="invisible"
          sitekey={sitekey}
          onChange={onChangeHandler}
        />
      );
    },
  };
}
