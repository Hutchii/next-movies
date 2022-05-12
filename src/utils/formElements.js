import Input from "../components/Form/input";
import Textarea from "../components/Form/textarea";
import Checkbox from "../components/Form/checkbox";

export function createFormInput(
  label,
  name,
  type,
  placeholder,
  errorMessage,
  defaultValue = ""
) {
  return {
    renderInput: (onChangeHandler, onBlurHandler, value, isTouched, valid) => {
      return (
        <Input
          key={label}
          name={name}
          type={type}
          label={label}
          value={value}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          errorMessage={errorMessage}
          isTouched={isTouched}
          isValid={valid}
          placeholder={placeholder}
        />
      );
    },
    value: defaultValue,
    valid: false,
    isTouched: false,
  };
}

export function createFormTextarea(
  label,
  name,
  type,
  placeholder,
  errorMessage,
  defaultValue = ""
) {
  return {
    renderInput: (onChangeHandler, onBlurHandler, value, isTouched, valid) => {
      return (
        <Textarea
          key={label}
          name={name}
          type={type}
          label={label}
          value={value}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          errorMessage={errorMessage}
          isTouched={isTouched}
          isValid={valid}
          placeholder={placeholder}
        />
      );
    },
    value: defaultValue,
    valid: false,
    isTouched: false,
  };
}

export function createFormCheckbox(
  label,
  name,
  errorMessage,
  optional = false,
  defaultValue = false
) {
  return {
    renderInput: (onChangeHandler, value, isTouched, valid) => {
      return (
        <Checkbox
          key={label}
          name={name}
          label={label}
          value={value}
          onChangeHandler={onChangeHandler}
          isValid={valid}
          isTouched={isTouched}
          optional={optional}
          errorMessage={errorMessage}
        />
      );
    },
    value: defaultValue,
    valid: false,
    isTouched: false,
    optional,
  };
}
