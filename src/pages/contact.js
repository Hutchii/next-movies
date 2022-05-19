import styled from "styled-components";
import useForm from "../hooks/useForm";
import { form } from "../utils/formConfig";
import Buttton from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import Overlay from "../components/Form/overlay";
// import Input from "../components/Form/Input";
import { useState } from "react";

export default function Contact() {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const { renderFormInputs, onSubmit, isSending, sendingStatus } =
    useForm(form);

  return (
    <main className="spacer center">
      <WrapperStyled className="spacer">
        <Overlay sendingStatus={sendingStatus} />
        <HeadingStyled>Contact us</HeadingStyled>
        <TitleStyled>
          FILL IN THE <TitleItalicStyled>FORM</TitleItalicStyled>
        </TitleStyled>
        <FormStyled sendingStatus={sendingStatus}>
          {renderFormInputs()}
          <Buttton mode="active" onClickHandler={onSubmit}>
            <Spinner isSending={isSending} />
          </Buttton>
        </FormStyled>
      </WrapperStyled>
    </main>
  );
}

const WrapperStyled = styled.div`
  width: calc(100% + 6.4rem);
  margin-left: -3.2rem;
  background-color: var(--white);
  position: relative;
  @media (min-width: 768px) {
    width: unset;
    margin-left: 0;
  }
`;
const HeadingStyled = styled.h1`
  font-family: var(--le);
  color: var(--black);
  font-size: 3.2rem;
  text-align: center;
  padding-top: 4.6rem;
  font-weight: 300;
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
  row-gap: 1.2rem;
  padding-bottom: 5rem;
  > div:first-of-type {
    position: absolute;
  }
  > div:nth-of-type(2) {
    flex: 1 1 45%;
  }
  > div:nth-of-type(3) {
    flex: 1 1 45%;
  }
  > div:nth-of-type(4) {
    flex: 1 1 100%;
  }
  > div:nth-of-type(5) {
    flex: 1 1 100%;
  }
  button {
    width: 200px;
    height: 42px;
    position: relative;
    margin-top: -0.5rem;
  }
  @media (min-width: 480px) {
    row-gap: 1.8rem;
  }
  @media (min-width: 900px) {
    > div:nth-of-type(5) {
      flex: 1 1 45%;
    }
  }
`;
