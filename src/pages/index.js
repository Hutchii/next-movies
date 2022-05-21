import { initializeApollo, addApolloState } from "../utils/apolloClient";
import { FEATURED_MOVIES } from "../utils/apolloQueries";
import Title from "../components/Title/Title";
import Director from "../components/Director/Director";
import TitleMore from "../components/Title/TitleMore";
import Error from "./_error";
import Head from "next/head";
import Articles from "../components/Articles/Articles";
import { apolloError } from "../utils/apolloError";

export default function Home({
  moviesData,
  directorData,
  articlesData,
  errorCode,
}) {
  if (errorCode || !moviesData) return <Error statusCode={errorCode} />;
  return (
    <>
      <Head>
        <title>Movies - Blog</title>
      </Head>
      <Title data={moviesData.slice(0, 4)}>
        <TitleMore data={moviesData.slice(4)} />
      </Title>
      {directorData && <Director data={directorData} />}
      {articlesData && <Articles data={articlesData} />}
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: FEATURED_MOVIES,
    });
    return addApolloState(apolloClient, {
      props: {
        moviesData: data.movies.data,
        directorData: data.directors.data,
        articlesData: data.articles.data,
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
