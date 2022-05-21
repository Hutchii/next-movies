import styled from "styled-components";

export default function MoviesResults({ moviesDataTotal }) {
  return (
    <ResultsStyled>
      {moviesDataTotal} <GreyStyled>results</GreyStyled>
    </ResultsStyled>
  );
}

const ResultsStyled = styled.p`
  font: 600 1.4rem var(--inter);
  text-transform: uppercase;
  margin-top: 1.5rem;
`;
const GreyStyled = styled.span`
  color: var(--grey);
`;
