import styled from "styled-components";

export default function Input({
  name,
  label,
  placeholder,
  type,
  onChangeHandler,
  onBlurHandler,
  value,
  isTouched,
  error,
  wasSubmitted,
}) {
  const showError = (isTouched || wasSubmitted === "submitted") && error;
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
        showError={showError}
      />
      <ErrorMessage showError={showError}>
        {showError ? error : ""}
      </ErrorMessage>
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
`;
const InputField = styled.textarea`
  font-family: inherit;
  resize: none;
  border: ${({ showError }) =>
    showError ? "1px solid var(--red)" : "1px solid var(--black)"};
  font-size: 1.8rem;
  outline: none;
  color: var(--black);
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  height: 20rem;
  transition: border 0.35s cubic-bezier(0.1, 1, 0.2, 1);
  &:focus {
    border: 1px solid var(--gold);
  }
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
  margin-left: 0.1rem;
  opacity: ${({ showError }) => (showError ? "1" : "0")};
  @media (min-width: 480px) {
    font-size: 1.4rem;
    min-height: 2rem;
  }
`;
