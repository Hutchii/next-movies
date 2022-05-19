import { initializeApollo, addApolloState } from "../libs/apolloClient";
import { MOVIES_FILTERS_PAGINATION } from "../libs/apolloQueries";
import AllPosts from "../components/AllPosts/AllPosts";
import Head from "next/head";
import Error from "./_error";
import { apolloError } from "../utils/apolloError";

export default function SSRLoadMore({ moviesData, errorCode }) {
  // if (errorCode || !moviesData) return <Error statusCode={errorCode} />;
  return (
    <>
      <Head>
        <title>Movies</title>
      </Head>
      <AllPosts data={moviesData} />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: MOVIES_FILTERS_PAGINATION,
    });
    return addApolloState(apolloClient, {
      props: {
        moviesData: data.movies.data,
      },
    });
  } catch (err) {
    return {
      props: {
        errorCode: apolloError(err),
      },
    };
  }
}
