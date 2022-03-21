import { initializeApollo } from "../libs/apolloClient";
import { SLUG, SLUG_DATA } from "../libs/apolloQueries";
import Image from "next/image";
import { imageUrlBuilder } from "../libs/imageUrlBuilder";
import { dateConverter } from "../libs/dateConverter";
import Markdown from "../components/Sections/Markdown";
import { directorsFormatter } from "../libs/directorsFormatter";
import Share from "../components/Sections/Share";
import Error from "next/error";

export default function Slug({ data, errorCode }) {
  if (!data) return <Error statusCode={errorCode} />;
  const slugData = data.movies.data[0].attributes;
  return (
    <article className="spacer">
      <div className="title-slug margin--header">
        <div className="title-slug--info">
          <h1 className="heading--64">{slugData.title}</h1>
          <p className="text--14 color--gold font--inter">{`By ${directorsFormatter(
            slugData.directors.data
          )}`}</p>
          <p className="text--14 color--grey font--inter">
            {dateConverter(slugData.createdAt)}
          </p>
        </div>
        <div className="title-slug--image">
          <Image
            src={imageUrlBuilder(slugData.image.data.attributes.url)}
            alt="Movie"
            width={900}
            height={526}
            priority
            unoptimized
          />
        </div>
        <Markdown content={slugData.content} />
        <Share />
      </div>
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

export async function getStaticProps({ params }) {
  const apolloClientSlugData = initializeApollo();
  const slug = params.slug;

  try {
    const { error, data } = await apolloClientSlugData.query({
      query: SLUG_DATA,
      variables: { slug: slug },
      revalidate: 10,
    });
    if (data.movies.data.length === 0 || error) {
      return { notFound: true };
    }
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
}
