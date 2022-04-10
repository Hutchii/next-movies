import styled from "styled-components";
import { ARTICLES } from "../../libs/apolloQueries";
import { useQuery } from "@apollo/client";
import ArticlesImage from "./ArticlesImage";
import { dateConverter } from "../../libs/dateConverter";

export default function Articles() {
  const { loading, error, data } = useQuery(ARTICLES);
  const articlesData = data?.articles.data[0].attributes;
  return (
    <section className="spacer">
      <StyledArticles>
        <StyledTitle>
          Most viewed articles in{" "}
          <StyledTitleItalic>movies reporter</StyledTitleItalic>
        </StyledTitle>
        {!loading && !error && (
          <StyledCard>
            <ArticlesImage imageUrl={articlesData.image.data.attributes?.url} />
            <StyledContent className="spacer">
              <StyledContentAuthor>By Sebastian Blaik</StyledContentAuthor>
              <StyledContentHeading>{articlesData.title}</StyledContentHeading>
              <StyledContentText>{articlesData.description}</StyledContentText>
              <StyledContentDate>
                {dateConverter(articlesData.createdAt)}
              </StyledContentDate>
            </StyledContent>
          </StyledCard>
        )}
      </StyledArticles>
    </section>
  );
}

const StyledArticles = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1600px) {
    margin-top: 15rem;
  }
`;
const StyledTitle = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: var(--inter);
  margin: 8rem 0 2.8rem 0;
  font-weight: 600;
  color: var(--black);
  text-align: center;
  @media (min-width: 1024px) {
    margin: 0 0 4rem 0;
  }
`;
const StyledTitleItalic = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
`;
const StyledCard = styled.div`
  background-color: #fff;
  width: calc(100% + 6.4rem);
  margin-left: -3.2rem;
  text-align: center;
  padding-bottom: 3rem;
  @media (min-width: 768px) {
    max-width: 750px;
    width: unset;
    margin-left: 0;
  }
  @media (min-width: 1280px) {
    display: flex;
    gap: 2rem;
    max-width: unset;
  }
`;
const StyledContent = styled.div`
  @media (min-width: 1280px) {
    flex: 1 1 50%;
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
  margin: 2rem 0 2rem 0;
  @media (min-width: 1280px) {
    font-size: 1.3rem;
  }
`;
const StyledContentHeading = styled.h1`
  font-family: var(--le);
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-size: 2.8rem;
  color: var(--black);
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
  @media (min-width: 1280px) {
    font-size: 4.2rem;
    margin-bottom: 2rem;
  }
`;
const StyledContentText = styled.p`
  font-family: var(--le);
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 1.4;
  @media (min-width: 1280px) {
    font-size: 2rem;
  }
`;
