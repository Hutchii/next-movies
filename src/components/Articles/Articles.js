import styled from "styled-components";
import { ARTICLES } from "../../libs/apolloQueries";
import { useQuery } from "@apollo/client";
import ArticlesPost from "./ArticlesPost";

export default function Articles() {
  const { loading, error, data } = useQuery(ARTICLES);
  const articlesData = data?.articles.data[0].attributes;
  const articlesData2 = data?.articles.data[1].attributes;
  const articlesData3 = data?.articles.data[2].attributes;
  const articlesData4 = data?.articles.data[3].attributes;
  return (
    <section className="spacer">
      <StyledArticles className="margin--top">
        <StyledTitle>
          Most viewed articles in{" "}
          <StyledTitleItalic>movies reporter</StyledTitleItalic>
        </StyledTitle>
        {!loading && !error && (
          <>
            <ArticlesPost data={articlesData} mode="horizontal" />
            <StyledVerticalFlex>
              <ArticlesPost data={articlesData2} />
              <ArticlesPost data={articlesData3} />
            </StyledVerticalFlex>
            <ArticlesPost
              data={articlesData4}
              mode="horizontal"
              dir="true"
            />
          </>
        )}
      </StyledArticles>
    </section>
  );
}

const StyledArticles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledTitle = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: var(--inter);
  font-weight: 600;
  color: var(--black);
  text-align: center;
`;
const StyledTitleItalic = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
`;
const StyledVerticalFlex = styled.div`
  width: calc(100% + 6.4rem);
  @media (min-width: 900px) {
    width: unset;
    display: grid;
    grid-gap: 4rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 0.6fr));
    > a:first-of-type {
      margin-top: 10rem;
    }
  }
  @media (min-width: 1280px) {
    grid-gap: 6rem;
    > a:first-of-type {
      margin-top: 15rem;
    }
  }
  @media (min-width: 1440px) {
    grid-gap: 8rem;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 0.8fr));
  }
`;
