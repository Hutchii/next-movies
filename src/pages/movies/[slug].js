import { initializeApollo } from "../../libs/apolloClient";
import { SLUG, SLUG_DATA } from "../../libs/apolloQueries";
import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import { dateConverter } from "../../libs/dateConverter";
import Markdown from "../../components/Sections/Markdown";
import { directorsFormatter } from "../../libs/directorsFormatter";
import Share from "../../components/Sections/Share";
import Error from "../_error";
import styled from "styled-components";
import { apolloError } from "../../utils/apolloError";

export default function SlugLoadMore({ data, errorCode }) {
  if (!data || errorCode) return <Error statusCode={errorCode} />;
  const slugData = data.movies.data[0].attributes;
  return (
    <article className="spacer center">
      <WrapperStyled>
        <ContentStyled>
          <TitleStyled>{slugData.title}</TitleStyled>
          <DirectorStyled>{`By ${directorsFormatter(
            slugData.directors.data
          )}`}</DirectorStyled>
          <DateStyled>{dateConverter(slugData.createdAt)}</DateStyled>
        </ContentStyled>
        <ImageStyled>
          <Image
            src={imageUrlBuilder(slugData.image.data.attributes.url)}
            alt="Movie"
            width={900}
            height={526}
            priority
            unoptimized
          />
        </ImageStyled>
        <Markdown content={slugData.content} />
        {/* <Share /> */}
      </WrapperStyled>
    </article>
  );
}

export async function getStaticPaths() {
  const apolloClientSlug = initializeApollo();

  const { data } = await apolloClientSlug.query({
    query: SLUG,
  });
  const paths = data.movies.data.map(({ attributes }) => {
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
      query: SLUG_DATA,
      variables: { slug: params.slug, publicationState: publicationState },
      revalidate: 60,
    });
    if (data.movies.data.length === 0) {
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
const ImageStyled = styled.div`
  width: calc(100% + 6.4rem);
  margin-left: -3.2rem;
  @media (min-width: 768px) {
    width: unset;
    margin-left: 0;
  }
`;
