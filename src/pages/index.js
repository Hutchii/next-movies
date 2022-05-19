import { initializeApollo, addApolloState } from "../libs/apolloClient";
import { FEATURED_MOVIES } from "../libs/apolloQueries";
import Title from "../components/Title/Title";
import Director from "../components/Director/Director";
import TitleMore from "../components/Title/TitleMore";
import Error from "./_error";
import Head from "next/head";
import Articles from "../components/Articles/Articles";
import { apolloError } from "../utils/apolloError";

export default function Home({
  featuredMovies,
  directorData,
  articlesData,
  errorCode,
}) {
  if (errorCode || !featuredMovies) return <Error statusCode={errorCode} />;
  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <Title featuredMoviesData={featuredMovies.slice(0, 4)}>
        <TitleMore moreMoviesData={featuredMovies.slice(4)} />
      </Title>
      {directorData && <Director data={directorData} />}
      <Articles data={articlesData} />
    </>
  );
}

export async function getStaticProps() {
  const apolloClientFeatured = initializeApollo();
  try {
    const { data: featuredData } = await apolloClientFeatured.query({
      query: FEATURED_MOVIES,
    });
    return addApolloState(apolloClientFeatured, {
      props: {
        featuredMovies: featuredData.movies.data,
        directorData: featuredData.directors.data,
        articlesData: featuredData.articles.data,
      },
      revalidate: 60,
    });
  } catch (err) {
    return {
      props: {
        errorCode: apolloError(err),
      },
    };
  }
}
