import styled, { keyframes } from "styled-components";
import useForm from "../hooks/useForm";
import { form } from "../utils/formConfig";
import Buttton from "../components/UI/Button";
import { useState } from "react";

export default function Contact() {
  const { renderFormInputs, formData } = useForm(form);
  // async function handleOnSubmit(e) {
  //   e.preventDefault();
  //   fetch("api/sendMail", {
  //     method: "post",
  //     body: JSON.stringify(formValues),
  //   });
  // }
  const [isSending, setIsSending] = useState(null);
  return (
    <main className="spacer">
      <WrapperStyled className="spacer">
        <HeadingStyled>Contact us</HeadingStyled>
        <TitleStyled>
          FILL IN THE <TitleItalicStyled>FORM</TitleItalicStyled>
        </TitleStyled>
        <FormStyled active={isSending}>
          {renderFormInputs()}
          <Buttton
            mode="active"
            // buttonName="Send message"
            onClickHandler={formData}
          >
            <span>Send Message</span>
            <SpinnerStyled active={isSending}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </SpinnerStyled>
          </Buttton>
        </FormStyled>
      </WrapperStyled>
      <button onClick={() => setIsSending((prevValue) => !prevValue)}>
        CLICK ME
      </button>
    </main>
  );
}
const WrapperStyled = styled.div`
  width: calc(100% + 6.4rem);
  margin-left: -3.2rem;
  background-color: var(--white);
  margin-top: 3.5rem;
  @media (min-width: 768px) {
    margin-top: 5rem;
  }
  @media (min-width: 1280px) {
    margin-top: 8rem;
  }
`;
const HeadingStyled = styled.h1`
  font-family: var(--le);
  color: var(--black);
  font-size: 3.2rem;
  text-align: center;
  padding-top: 3.6rem;
`;
const TitleStyled = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: var(--inter);
  font-weight: 600;
  color: var(--black);
  text-align: center;
  margin: 3.2rem 0 6.4rem 0;
`;
const TitleItalicStyled = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
`;
const FormStyled = styled.form`
  margin: 0 auto;
  max-width: 100rem;
  display: flex;
  flex-wrap: wrap;
  column-gap: 3.6rem;
  row-gap: 2rem;
  padding-bottom: 3.6rem;
  > div {
    flex: 1 1 45%;
  }
  > div:nth-of-type(3) {
    flex: 1 1 100%;
  }
  button {
    width: 200px;
    height: 42px;
    position: relative;
  }
  button > span {
    transition: opacity 0.2s ease;
    opacity: ${({ active }) => (active ? "0" : "1")};
  }
`;
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
    transform: translate(24px, 0);
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
const SpinnerStyled = styled.div`
  /* display: inline-block; */
  /* width: 200px;
  height: 42px; */
  transition: opacity 0.2s ease;
  opacity: ${({ active }) => (active ? "1" : "0")};
  div {
    position: absolute;
    top: 34%;
    left: 34%;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--darkwhite);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    margin-left: 8px;
    animation: ${spinnerAnimation1} 0.6s infinite;
  }
  div:nth-child(2) {
    margin-left: 8px;
    animation: ${spinnerAnimation2} 0.6s infinite;
  }
  div:nth-child(3) {
    margin-left: 32px;
    animation: ${spinnerAnimation2} 0.6s infinite;
  }
  div:nth-child(4) {
    margin-left: 56px;
    animation: ${spinnerAnimation3} 0.6s infinite;
  }
`;
