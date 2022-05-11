import styled from "styled-components";

export default function Input({
  name,
  label,
  placeholder,
  errorMessage,
  type,
  onChangeHandler,
  onBlurHandler,
  value,
  isTouched,
  isValid,
}) {
  return (
    <InputBox>
      <LabelField>{label}</LabelField>
      <InputField
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={value}
      />
      <ErrorMessage>
        {errorMessage && isTouched && !isValid ? errorMessage : ""}
      </ErrorMessage>
    </InputBox>
  );
}
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--inter);
`;
const LabelField = styled.label`
  /* display: block; */
  font-size: 1.7rem;
  color: var(--black);
  font-weight: 500;
`;
const InputField = styled.textarea`
  font-family: var(--inter);
  resize: none;
  border: none;
  border: 1px solid var(--black);
  font-size: 2rem;
  outline: none;
  color: var(--darknavy);
  padding: 1rem 1.4rem;
  font-weight: 500;
  height: 20rem;
  ::placeholder {
    color: #CCCCCC;
  }
`;
const ErrorMessage = styled.span`
  color: var(--red);
  font-size: 1.6rem;
  font-weight: 500;
  min-height: 2rem;
`;
