import styled from "styled-components";
import { ARTICLES } from "../../libs/apolloQueries";
import { useQuery } from "@apollo/client";
import ArticlesPost from "./ArticlesPost";

export default function Articles() {
  const { loading, error, data } = useQuery(ARTICLES);
  const articlesData = data?.articles.data;

  const sortArticles = (articlesData) => {
    const sortedArticles = [];
    let articleHorizontal = 0;
    articlesData.forEach((el, i) => {
      if (i === articleHorizontal) {
        articleHorizontal += 3;
        sortedArticles.push(el);
      } else {
        Array.isArray(sortedArticles.at(-1))
          ? sortedArticles.at(-1).push(el)
          : sortedArticles.push([el]);
      }
    });
    return sortedArticles;
  };
  return (
    <section className="spacer">
      <WrapperStyled className="margin--top">
        <TitleStyled>
          Most viewed
          <StyledTitleItalic> articles</StyledTitleItalic>
        </TitleStyled>
        {!loading && !error && (
          <>
            {sortArticles(articlesData).map((article, i) => {
              if (!Array.isArray(article)) {
                return (
                  <ArticlesPost
                    key={article?.attributes.title}
                    data={article?.attributes}
                    mode="horizontal"
                  />
                );
              } else {
                console.log(article.length === 1);
                return (
                  <VerticalWrapperStyled key={i} single={article.length === 1}>
                    {article.map((oneArticle) => {
                      return (
                        <ArticlesPost
                          key={oneArticle?.attributes.title}
                          data={oneArticle?.attributes}
                        />
                      );
                    })}
                  </VerticalWrapperStyled>
                );
              }
            })}
          </>
        )}
      </WrapperStyled>
    </section>
  );
}

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleStyled = styled.h2`
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
const VerticalWrapperStyled = styled.div`
  width: calc(100% + 6.4rem);
  @media (min-width: 768px) {
    max-width: 750px;
    width: unset;
  }
  @media (min-width: 900px) {
    width: unset;
    max-width: ${({ single }) => (single ? "750px" : "unset")};
    display: ${({ single }) => (single ? "block" : "grid")};
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
