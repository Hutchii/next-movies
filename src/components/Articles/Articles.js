import styled from "styled-components";
import { ARTICLES } from "../../libs/apolloQueries";
import { useQuery } from "@apollo/client";
import ArticlesPost from "./ArticlesPost";
import Button from "../UI/Button";

export default function Articles() {
  const { loading, error, data, fetchMore, refetch } = useQuery(ARTICLES, {
    variables: {
      start: 0,
      limit: 4,
    },
  });
  const articlesData = data?.articles.data;
  const dataLength = articlesData?.length;

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

  const finalData = !loading && sortArticles(articlesData);
  return (
    <section className="spacer center">
      <WrapperStyled className="margin--top">
        <TitleStyled>
          Most viewed
          <TitleItalicStyled> articles</TitleItalicStyled>
        </TitleStyled>
        {!loading && !error && (
          <>
            {finalData.map((article, i) => {
              if (!Array.isArray(article)) {
                return (
                  <ArticlesPost
                    key={article?.attributes.title}
                    data={article?.attributes}
                    mode="horizontal"
                  />
                );
              } else {
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
        <Button
          buttonName="Load more"
          onClickHandler={() => {
            fetchMore({
              variables: {
                limit: dataLength + 4,
              },
            });
          }}
        />
      </WrapperStyled>
    </section>
  );
}

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 3.2rem;
  }
`;
const TitleStyled = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: var(--inter);
  font-weight: 600;
  color: var(--black);
  text-align: center;
`;
const TitleItalicStyled = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
`;
const VerticalWrapperStyled = styled.div`
  width: calc(100% + 6.4rem);
  @media (min-width: 768px) {
    max-width: 75rem;
    width: unset;
  }
  @media (min-width: 900px) {
    max-width: ${({ single }) => (single ? "75rem" : "unset")};
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
