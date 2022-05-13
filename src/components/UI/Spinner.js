import styled, { keyframes } from "styled-components";

export default function Spinner({ isSending }) {
  return (
    <>
      <TextStyled active={isSending}>Send Message</TextStyled>
      <SpinnerStyled active={isSending}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SpinnerStyled>
    </>
  );
}

const spinnerAnimation1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const spinnerAnimation2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 0);
  }
`;
const spinnerAnimation3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const TextStyled = styled.span`
  transition: opacity 0.2s ease;
  opacity: ${({ active }) => (active ? "0" : "1")};
`;
const SpinnerStyled = styled.div`
  transition: opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: ${({ active }) => (active ? "1" : "0")};
  div {
    position: absolute;
    top: 16px;
    left: 76px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--darkwhite);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    animation: ${spinnerAnimation1} 0.6s infinite;
  }
  div:nth-child(2) {
    animation: ${spinnerAnimation2} 0.6s infinite;
  }
  div:nth-child(3) {
    margin-left: 20px;
    animation: ${spinnerAnimation2} 0.6s infinite;
  }
  div:nth-child(4) {
    margin-left: 40px;
    animation: ${spinnerAnimation3} 0.6s infinite;
  }
`;
