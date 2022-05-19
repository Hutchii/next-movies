import Button from "../UI/Button";
import styled from "styled-components";
import DirectorImage from "./DirectorImage";

export default function Director({ data }) {
  const directorData = data[0]?.attributes;

  return (
    <WrapperStyled className="mt">
      <>
        <DirectorImage imageUrl={directorData.image.data.attributes?.url} />
        <ContentStyled>
          <TitleStyled>
            Discover <StyledTitleItalic>movies from</StyledTitleItalic>
          </TitleStyled>
          <StyledHeading>{directorData.director}</StyledHeading>
          <Button buttonHref="/" buttonName="see all" mode="light" />
        </ContentStyled>
      </>
    </WrapperStyled>
  );
}

const WrapperStyled = styled.section`
  background-color: var(--black);
  @media (min-width: 900px) {
    background: none;
    display: flex;
  }
`;
const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 3rem;
  gap: 2.4rem;
  @media (min-width: 600px) {
    padding: 8rem 4.2rem;
  }
  @media (min-width: 900px) {
    padding: 4.6rem;
    flex: 1 1 50%;
    background-color: var(--black);
  }
  @media (min-width: 1600px) {
    gap: 3.2rem;
  }
`;
const TitleStyled = styled.p`
  font: 500 1.5rem var(--inter);
  text-transform: uppercase;
  color: var(--darkwhite);
`;
const StyledHeading = styled.h1`
  font: 500 3rem var(--le);
  color: var(--darkwhite);
  line-height: 1.4;
  @media (min-width: 480px) {
    font-size: 3.6rem;
  }
  @media (min-width: 768px) {
    font-size: 4.6rem;
  }
  @media (min-width: 900px) {
    font-size: 3.6rem;
  }
  @media (min-width: 1280px) {
    font-size: 4.6rem;
  }
  @media (min-width: 1600px) {
    font-size: 7.2rem;
  }
`;
const StyledTitleItalic = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
`;
