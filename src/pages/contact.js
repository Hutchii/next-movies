import { useState } from "react";
import useInput from "./hooks/useInput";

export default function Contact() {
  const [page, setPage] = useState(1);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetValue: resetNameInput,
  } = useInput((value) => /^(\w\.?)+@[\w\.-]+\.\w{2,}$/.test(value));
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetValue: resetEmailInput,
  } = useInput((value) => /^(\w\.?)+@[\w\.-]+\.\w{2,}$/.test(value));
  
  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nextPage = (isValid) =>
    isValid && setPage((prevValue) => prevValue + 1);

  const prevPage = () => setPage((prevValue) => prevValue - 1);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return; //extra validation if the user change something in dev tools
    resetNameInput();
    resetEmailInput();
  };
  console.log(enteredNameIsValid);
  return (
    <div className="spacer">
      <h1>Validation on every key stroke</h1>
      <form onSubmit={formSubmissionHandler}>
        <div style={{ opacity: page === 1 ? "1" : "0.5" }}>
          <p>1</p>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputError && <p>Błąd SMUTNA_BUŹKA</p>}
          <div>
            <button type="button" onClick={() => nextPage(enteredNameIsValid)}>
              Next page
            </button>
          </div>
        </div>
        <div style={{ opacity: page === 2 ? "1" : "0.5" }}>
          <p>2</p>
          <label htmlFor="email">Your Name</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputError && <p>Błąd SMUTNA_BUŹKA</p>}
          <div>
            <button
              type="button"
              disabled={!enteredEmailIsValid}
              onClick={() => {
                prevPage();
                resetEmailInput();
              }}
            >
              Previous page
            </button>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
