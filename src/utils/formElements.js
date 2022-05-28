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
  value = ""
) {
  return {
    renderInput(
      onChangeHandler,
      value,
      isTouched,
      error,
      wasSubmitted,
      onBlurHandler
    ) {
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
    value,
    error: defaultError,
    isTouched: false,
    defaultError: defaultError,
    defaultValue: value,
  };
}

export function createFormTextarea(
  label,
  name,
  type,
  placeholder,
  defaultError,
  value = ""
) {
  return {
    renderInput(
      onChangeHandler,
      value,
      isTouched,
      error,
      wasSubmitted,
      onBlurHandler
    ) {
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
    value,
    error: defaultError,
    isTouched: false,
    defaultError,
    defaultValue: value,
  };
}

export function createFormCheckbox(
  label,
  name,
  defaultError,
  optional = false,
  value = false
) {
  return {
    renderInput(onChangeHandler, value, isTouched, error, wasSubmitted) {
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
    value,
    error: defaultError,
    isTouched: false,
    defaultError: defaultError,
    defaultValue: value,
    optional: false,
  };
}

export function createReCaptcha(sitekey) {
  return {
    renderInput(ref) {
      return (
        <ReCAPTCHA key="captcha" ref={ref} size="invisible" sitekey={sitekey} />
      );
    },
  };
}
