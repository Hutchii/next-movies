import styled from "styled-components";

export default function Custom404() {
  return (
    <main className="spacer center">
      <Wrapper>
        <Error><ItalicStyled>404:</ItalicStyled> Page not found!</Error>
      </Wrapper>
    </main>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;
const Error = styled.p`
  font-size: 1.8rem;
  font-family: var(--inter);
  font-weight: 600;
  text-transform: uppercase;
`
const ItalicStyled = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
  font-size: 3.6rem;
  margin-right: 1rem;
`;