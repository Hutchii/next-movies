import { initializeApollo, addApolloState } from "../libs/apolloClient";
import {
  MOVIES,
  FEATURED_MOVIES,
  MORE_MOVIES,
  DIRECTOR,
} from "../libs/apolloQueries";
import { useQuery } from "@apollo/client";
import TitleHome from "../components/Sections/TitleHome";
import Director from "../components/Sections/Director";

export default function Home({ featuredMovies, moreMovies, director }) {
  // const { loading, error, data, fetchMore } = useQuery(MOVIES);
  return (
    <>
      <TitleHome
        featuredMoviesData={featuredMovies}
        moreMoviesData={moreMovies}
      />
      <Director directorData={director} />
    </>
  );
}

export async function getServerSideProps() {
  const apolloClientFeatured = initializeApollo();
  const apolloClientMore = initializeApollo();
  const apolloClientDirector = initializeApollo();

  // await apolloClient.query({
  //   query: MOVIES,
  // });

  const { data: featuredData } = await apolloClientFeatured.query({
    query: FEATURED_MOVIES,
  });

  const { data: moreData } = await apolloClientMore.query({
    query: MORE_MOVIES,
  });
  const { data: directorData } = await apolloClientDirector.query({
    query: DIRECTOR,
  });

  return {
    props: {
      featuredMovies: featuredData.movies.data,
      moreMovies: moreData.movies.data,
      director: directorData.directors.data,
    },
  };
}
