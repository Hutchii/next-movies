import { initializeApollo, addApolloState } from "../libs/apolloClient";
import { MOVIES, FEATURED_MOVIES, MORE_MOVIES } from "../libs/apolloQueries";
import { useQuery } from "@apollo/client";
import TitleHome from "../components/Sections/TitleHome";

export default function Home({ featuredMovies, moreMovies }) {
  // const { loading, error, data, fetchMore } = useQuery(MOVIES);
  return (
    <>
      <TitleHome
        featuredMoviesData={featuredMovies}
        moreMoviesData={moreMovies}
      />
    </>
  );
}

export async function getServerSideProps() {
  const apolloClientFeatured = initializeApollo();
  const apolloClientMore = initializeApollo();

  // await apolloClient.query({
  //   query: MOVIES,
  // });

  const { data: featuredData } = await apolloClientFeatured.query({
    query: FEATURED_MOVIES,
  });

  const { data: moreData } = await apolloClientMore.query({
    query: MORE_MOVIES,
  });

  return {
    props: {
      featuredMovies: featuredData.movies.data,
      moreMovies: moreData.movies.data,
    },
  };
}
