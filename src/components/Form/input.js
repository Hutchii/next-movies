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
  gap: 0.8rem;
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
const InputField = styled.input`
  border: none;
  border: 1px solid var(--black);
  font-size: 1.8rem;
  outline: none;
  color: var(--darknavy);
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  ::placeholder {
    font-size: 1.6rem;
    color: #CCCCCC;
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
  font-weight: 600;
  min-height: 1.8rem;
  @media (min-width: 480px) {
    font-size: 1.5rem;
    min-height: 2rem;
  }
`;
