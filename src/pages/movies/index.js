import { initializeApollo, addApolloState } from "../../utils/apolloClient";
import { MOVIES_FILTERS_PAGINATION } from "../../utils/apolloQueries";
import Movies from "../../components/Movies/Movies";
import Head from "next/head";
import Error from "../_error";
import { apolloError } from "../../utils/apolloError";

export default function MoviesBlog({ moviesData, errorCode }) {
  if (errorCode || !moviesData) return <Error statusCode={errorCode} />;
  return (
    <>
      <Head>
        <title>All Movies</title>
        <meta
          name="description"
          content="All movies."
        />
      </Head>
      {moviesData && <Movies data={moviesData} />}
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
