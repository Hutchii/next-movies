import styled from "styled-components";
import useForm from "../hooks/useForm";
import { form } from "../utils/formConfig";
import Buttton from "../components/UI/Button";

export default function Contact() {
  const { renderFormInputs, formData } = useForm(form);
  const { isValid, formValues } = formData();
  return (
    <main className="spacer">
      <WrapperStyled className="spacer">
        <HeadingStyled>Contact us</HeadingStyled>
        <TitleStyled>
          FILL IN THE <TitleItalicStyled>FORM</TitleItalicStyled>
        </TitleStyled>
        <FormStyled>
          {renderFormInputs()}
          <Buttton mode="active" buttonName="Send message" />
        </FormStyled>
      </WrapperStyled>
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
`;
