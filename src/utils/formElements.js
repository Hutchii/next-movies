import Input from "../components/Form/input";
import Textarea from "../components/Form/textarea";
import Checkbox from "../components/Form/checkbox";

export function createFormInput(
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
      error,
      isTouched,
      valid
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
          errorMessage={error}
          isTouched={isTouched}
          isValid={valid}
          placeholder={placeholder}
        />
      );
    },
    value: defaultValue,
    valid: false,
    errorMessage: "",
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
      error,
      isTouched,
      valid
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
          errorMessage={error}
          isTouched={isTouched}
          isValid={valid}
          placeholder={placeholder}
        />
      );
    },
    value: defaultValue,
    valid: false,
    errorMessage: "",
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
    renderInput: (onChangeHandler, value, error, isTouched, valid) => {
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
          errorMessage={error}
        />
      );
    },
    value: defaultValue,
    valid: false,
    errorMessage: "",
    isTouched: false,
    optional,
  };
}
