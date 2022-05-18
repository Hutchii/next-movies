import Input from "../components/Form/input";
import Textarea from "../components/Form/textarea";
import Checkbox from "../components/Form/checkbox";
import ReCAPTCHA from "react-google-recaptcha";

export function createFormInput(
  label,
  name,
  type,
  placeholder,
  defaultError,
  defaultValue = ""
) {
  return {
    renderInput: (
      onChangeHandler,
      value,
      isTouched,
      error,
      wasSubmitted,
      onBlurHandler
    ) => {
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
    error: defaultError,
    isTouched: false,
    defaultError: defaultError,
  };
}

export function createFormTextarea(
  label,
  name,
  type,
  placeholder,
  defaultError,
  defaultValue = ""
) {
  return {
    renderInput: (
      onChangeHandler,
      value,
      isTouched,
      error,
      wasSubmitted,
      onBlurHandler
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
    error: defaultError,
    isTouched: false,
    defaultError: defaultError,
  };
}

export function createFormCheckbox(
  label,
  name,
  defaultError,
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
    error: defaultError,
    isTouched: false,
    defaultError: defaultError,
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
          // onChange={onChangeHandler}
        />
      );
    },
  };
}
