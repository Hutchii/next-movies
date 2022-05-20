import styled from "styled-components";
import ArticlesPost from "./ArticlesPost";
import Button from "../UI/Button";
import { useState } from "react";

export default function Articles({ data }) {
  const [limit, setLimit] = useState(3);

  const sortArticles = (articlesData) => {
    const sortedArticles = [];
    let articleHorizontal = 0;
    articlesData.forEach((el, i) => {
      if (i === articleHorizontal) {
        articleHorizontal += 3;
        sortedArticles.push(el);
      } else {
        Array.isArray(sortedArticles[sortedArticles.length - 1])
          ? sortedArticles[sortedArticles.length - 1].push(el)
          : sortedArticles.push([el]);
      }
    });
    return sortedArticles;
  };
  const finalData = sortArticles(data);
  const dataLength = finalData?.length;

  return (
    <section className="spacer center">
      <WrapperStyled className="mt">
        <TitleStyled>
          Most viewed
          <TitleItalicStyled> articles</TitleItalicStyled>
        </TitleStyled>
        {finalData.slice(0, limit).map((article, i) => {
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
        <Button
          buttonName="Load more"
          onClickHandler={() => setLimit((prevValue) => prevValue + 3)}
          isDisabled={limit >= dataLength}
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
    margin-top: 5rem;
  }
`;
const TitleStyled = styled.h2`
  font: 600 1.6rem var(--inter);
  text-transform: uppercase;
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
