import { initializeApollo, addApolloState } from "../libs/apolloClient";
import {
  FEATURED_MOVIES,
  DIRECTOR,
  MOVIES_FILTERS
} from "../libs/apolloQueries";
import TitleHome from "../components/Sections/TitleHome";
import Director from "../components/Sections/Director";
import AllPosts from "../components/Sections/AllPosts";
import TitleHomeMore from "../components/Sections/TitleHomeMore";

export default function Home({ featuredMovies, director }) {
  return (
    <>
      <TitleHome featuredMoviesData={featuredMovies.slice(0, 4)}>
        <TitleHomeMore moreMoviesData={featuredMovies.slice(4)} />
      </TitleHome>
      <Director directorData={director} />
      <AllPosts />
    </>
  );
}

export async function getServerSideProps() {
  const apolloClientFeatured = initializeApollo();
  const apolloClientDirector = initializeApollo();
  const apolloClientCache = initializeApollo();

  await apolloClientCache.query({
    query: MOVIES_FILTERS,
    variables: {
      start: 0,
      limit: 6,
      genre: "all",
      title: ""
    },
  });

  const { data: featuredData } = await apolloClientFeatured.query({
    query: FEATURED_MOVIES,
  });
  const { data: directorData } = await apolloClientDirector.query({
    query: DIRECTOR,
  });

  return addApolloState(apolloClientCache, {
    props: {
      featuredMovies: featuredData.movies.data,
      director: directorData.directors.data,
    },
  });
}
