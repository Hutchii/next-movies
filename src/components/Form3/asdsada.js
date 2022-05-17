import { useState } from "react";
import styled from "styled-components";

export default function TextArea({ name, label, placeholder, validate, wasSubmitted }) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const errorMessage = validate(value, label);
  const showErrorMessage = (wasSubmitted || touched) && errorMessage;

  return (
    <InputBox>
      <LabelField htmlFor={name}>{label}:</LabelField>
      <InputField
        id={name}
        name={name}
        onChange={(e) => setValue(e.currentTarget.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        aria-required="true"
        showError={showErrorMessage}
      />
      {<ErrorMessage>{showErrorMessage ? errorMessage : ""}</ErrorMessage>}
    </InputBox>
  );
}

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-family: var(--inter);
`;
const LabelField = styled.label`
  font-size: 1.6rem;
  color: var(--black);
  font-weight: 500;
  @media (min-width: 480px) {
    font-size: 1.7rem;
  }
`;
const InputField = styled.textarea`
  font-family: var(--inter);
  resize: none;
  border: ${({ showError }) =>
    showError ? "1px solid var(--red)" : "1px solid var(--black)"};
  font-size: 1.8rem;
  outline: none;
  color: var(--darknavy);
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  height: 20rem;
  ::placeholder {
    font-size: 1.6rem;
    color: #cccccc;
  }
  @media (min-width: 480px) {
    font-size: 2rem;
    font-size: 1.8rem;
    padding: 1rem 1.4rem;
  }
`;
const ErrorMessage = styled.span`
  color: var(--red);
  font-size: 1.4rem;
  font-weight: 500;
  min-height: 1.8rem;
  @media (min-width: 480px) {
    font-size: 1.5rem;
    min-height: 2rem;
  }
`;
