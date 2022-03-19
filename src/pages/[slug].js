import { initializeApollo } from "../libs/apolloClient";
import { SLUG, SLUG_DATA } from "../libs/apolloQueries";
import Image from "next/image";
import { imageUrlBuilder } from "../libs/imageUrlBuilder";
import { dateConverter } from "../libs/dateConverter";

export default function Slug({ data }) {
  const slugData = data.movies.data[0].attributes;
  console.log(slugData);
  return (
    <article className="spacer">
      <div className="title-slug margin--header">
        <div className="title-slug--info">
          <h1 className="heading--64">{slugData.title}</h1>
          <p className="text--14 color--gold font--inter">By Sebastian Blaik</p>
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
        <p className="paragraph--18">{slugData.description}</p>
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

  const { data } = await apolloClientSlugData.query({
    query: SLUG_DATA,
    variables: { slug: slug },
  });
  return {
    props: {
      data,
    },
  };
}
