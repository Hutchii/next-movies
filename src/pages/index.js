import { initializeApollo, addApolloState } from "../libs/apolloClient";
import { MOVIES, FEATURED_MOVIES } from "../libs/apolloQueries";
import { useQuery } from "@apollo/client";
import TitleHome from "../components/Sections/TitleHome";

export default function Home({ featuredMovies }) {
  const { loading, error, data, fetchMore } = useQuery(MOVIES);
  return (
    <>
      <TitleHome featuredMoviesData={featuredMovies}/>
    </>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  const apolloClientFeatured = initializeApollo();

  await apolloClient.query({
    query: MOVIES,
  });

  const { data } = await apolloClientFeatured.query({
    query: FEATURED_MOVIES,
  });

  return addApolloState(apolloClient, {
    props: {
      featuredMovies: data.movies.data,
    },
  });
}
