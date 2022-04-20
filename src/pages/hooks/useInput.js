import { useState, useMemo } from "react";
import { debounce } from "lodash";

export default function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetValue = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  // const debounceEnteredValue = useMemo(
  //   () => debounce(valueChangeHandler, 500),
  //   []
  // );
  
  console.log(enteredValue);
  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    resetValue,
  };
}
