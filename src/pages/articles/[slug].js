import Head from "next/head";
import { initializeApollo } from "../../utils/apolloClient";
import { ARTICLES_SLUG, ARTICLES_ALL } from "../../utils/apolloQueries";
import { dateConverter } from "../../utils/dateConverter";
import Markdown from "../../components/Post/Markdown";
import Error from "../_error";
import styled from "styled-components";
import { apolloError } from "../../utils/apolloError";
import PostImage from "../../components/Post/PostImage";

export default function Post({ data, errorCode }) {
  if (!data || errorCode) return <Error statusCode={errorCode} />;
  const slugData = data.articles.data[0].attributes;
  return (
    <>
      <Head>
        <title>{`Movies - ${slugData.title}`}</title>
        <meta name="description" content="Movie." />
      </Head>
      <article className="spacer center">
        <WrapperStyled>
          <ContentStyled>
            <TitleStyled>{slugData.title}</TitleStyled>
            <DirectorStyled>Sebastian Fajny</DirectorStyled>
            <DateStyled>{dateConverter(slugData.createdAt)}</DateStyled>
          </ContentStyled>
          <PostImage image={slugData.image.data.attributes.url} />
          <Markdown content={slugData.content} />
        </WrapperStyled>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const apolloClientSlug = initializeApollo();

  const { data } = await apolloClientSlug.query({
    query: ARTICLES_SLUG,
  });
  const paths = data.articles.data.map(({ attributes }) => {
    return {
      params: {
        slug: attributes.slug,
      },
    };
  });
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, preview }) {
  const apolloClientSlugData = initializeApollo();
  const publicationState = preview ? "PREVIEW" : "LIVE";

  try {
    const { data } = await apolloClientSlugData.query({
      query: ARTICLES_ALL,
      variables: {
        slug: params.slug,
        publicationState: publicationState,
      },
      revalidate: 60,
    });
    if (data.articles.data.length === 0) {
      return {
        props: {
          errorCode: "404",
        },
      };
    }
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        errorCode: apolloError(err),
      },
    };
  }
}

const WrapperStyled = styled.div`
  margin: 0 auto;
  max-width: 90rem;
`;
const ContentStyled = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;
const TitleStyled = styled.h1`
  font: 500 4.2rem var(--le);
  color: var(--black);
  margin-bottom: 1.5rem;
  @media (min-width: 768px) {
    font-size: 6.4rem;
  }
  p:last-of-type {
    text-transform: uppercase;
    margin-top: 0.5rem;
  }
`;
const DirectorStyled = styled.p`
  color: var(--gold);
  font: 600 1.4rem var(--inter);
`;
const DateStyled = styled.p`
  color: var(--grey);
  text-transform: uppercase;
  margin-top: 0.8rem;
  font: 600 1.4rem var(--inter);
`;
