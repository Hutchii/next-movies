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
  @media (min-width: 480px) {
    font-size: 1.7rem;
  }
`;
const InputField = styled.input`
  border: none;
  /* border: ${({ showError }) =>
    showError ? "1px solid var(--red)" : "1px solid var(--black)"}; */
  border: 1px solid var(--black);
  font-size: 1.8rem;
  outline: none;
  color: var(--black);
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  ::placeholder {
    font-size: 1.6rem;
    color: #cccccc;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px var(--white) inset;
    box-shadow: 0 0 0px 1000px var(--white) inset;
    -webkit-text-fill-color: var(--black);
  }
  &:-webkit-autofill:first-line {
    color: var(--black);
  }
  @media (min-width: 480px) {
    font-size: 2rem;
    font-size: 1.8rem;
    padding: 1rem 1.4rem;
  }
`;
const ErrorMessage = styled.span`
  color: #b81b20;
  font-size: 1.4rem;
  font-weight: 500;
  min-height: 1.8rem;
  background-color: #f4d7d9;
  padding: 0.5rem 1.5rem;
  border: 1px solid #f28c93;
  opacity: ${({ showError }) => (showError ? "1" : "0")};
  @media (min-width: 480px) {
    font-size: 1.4rem;
    min-height: 3rem;
  }
`;
