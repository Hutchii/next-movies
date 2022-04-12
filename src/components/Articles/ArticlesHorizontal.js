import ArticlesImage from "./ArticlesImage";
import { dateConverter } from "../../libs/dateConverter";
import styled, { css } from "styled-components";

export default function ArticlesHorizontal({ data, dir, mode }) {
  return (
    <StyledCard dir={dir} mode={mode}>
      <ArticlesImage imageUrl={data.image.data.attributes?.url} />
      <StyledContent className="spacer">
        <StyledContentAuthor mode={mode}>By Sebastian Blaik</StyledContentAuthor>
        <StyledContentHeading>{data.title}</StyledContentHeading>
        <StyledContentText>{data.description}</StyledContentText>
        <StyledContentDate>{dateConverter(data.createdAt)}</StyledContentDate>
      </StyledContent>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  background-color: #fff;
  text-align: center;
  padding-bottom: 3rem;
  margin-top: 7rem;
  ${({ mode }) => {
    switch (mode) {
      case "horizontal":
        return css`
          width: calc(100% + 6.4rem);
          @media (min-width: 768px) {
            max-width: 750px;
            width: unset;
          }
          @media (min-width: 1280px) {
            display: flex;
            flex-direction: ${({ dir }) => (dir ? "row-reverse" : "unset")};
            justify-content: space-between;
            max-width: unset;
            padding-bottom: 0;
          }
        `;
      default:
        return css`
        display: flex
        flex-direction: column;
        justify-content: center;
        align-items: center;
        `
    }
  }}
  @media(min-width: 1280px) {
    margin-top: 10rem;
  }
`;
const StyledContent = styled.div`
  @media (min-width: 1280px) {
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const StyledContentDate = styled.p`
  font-family: var(--inter);
  font-size: 1.2rem;
  color: var(--grey);
  text-transform: uppercase;
  margin-top: 2rem;
  font-weight: 600;
  @media (min-width: 1280px) {
    font-size: 1.3rem;
  }
`;
const StyledContentAuthor = styled.p`
  font-family: var(--inter);
  font-size: 1.2rem;
  color: var(--gold);
  font-weight: 600;
  margin: 3rem 0 2rem 0;
  @media (min-width: 1280px) {
    font-size: 1.3rem;
    margin: ${({ mode }) => (mode ? "0 0 2rem 0" : "3rem 0 2rem 0")};
  }
`;
const StyledContentHeading = styled.h1`
  font-family: var(--le);
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-size: 2.6rem;
  color: var(--black);
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
  @media (min-width: 1280px) {
    margin-bottom: 2rem;
  }
`;
const StyledContentText = styled.p`
  font-family: var(--le);
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 1.4;
`;
