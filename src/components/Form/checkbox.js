import styled from "styled-components";

export default function Checkbox({
  name,
  label,
  onChangeHandler,
  value,
  isTouched,
  optional,
  error,
  wasSubmitted,
}) {
  const showError =
    (isTouched || wasSubmitted === "submitted") && !optional && error;
  return (
    <CheckBox>
      <LabelField>
        {label}
        <InputField
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChangeHandler}
          showError={showError}
        />
        <Span showError={showError} />
      </LabelField>
      <ErrorMessage showError={showError}>
        {showError ? error : ""}
      </ErrorMessage>
    </CheckBox>
  );
}

const CheckBox = styled.div`
  font-family: var(--inter);
  font-size: 1.4rem;
  color: var(--black);
  font-weight: 500;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
`;
const LabelField = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  padding-left: 2.2rem;
`;
const InputField = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ span:after {
    opacity: 1;
  }
  &:checked ~ span {
    background-color: var(--gold);
  }
`;
const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 1.65rem;
  width: 1.65rem;
  background-color: ${({ showError }) => (showError ? "#D1C7C7" : "#CCCCCC")};
  border-radius: 2px;
  transition: background-color 0.25s cubic-bezier(0.2, 0, 0.2, 1);
  &:after {
    opacity: 0;
  }
  &:after {
    left: 5px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid var(--white);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
const ErrorMessage = styled.span`
  color: var(--red);
  font-size: 1.4rem;
  font-weight: 500;
  min-height: 1.8rem;
  opacity: ${({ showError }) => (showError ? "1" : "0")};
  margin-top: 1rem;
  margin: 0.8rem 0 0 0.1rem;
  @media (min-width: 480px) {
    font-size: 1.4rem;
    min-height: 2rem;
  }
`;
