import { initializeApollo, addApolloState } from "../../../libs/apolloClient";
import {
  FEATURED_MOVIES,
  DIRECTOR,
  MOVIES_FILTERS,
} from "../../../libs/apolloQueries";
import TitleHome from "../../../components/Sections/TitleHome";
import Director from "../../../components/Sections/Director";
import AllPostsInfiniteScrolling from "../../../components/AllPosts/AllPostsInfiniteScrolling";
import TitleHomeMore from "../../../components/Sections/TitleHomeMore";
import Error from "next/error";

export default function SSRInfiniteScrolling({
  featuredMovies,
  director,
  errorCode,
}) {
  if (!featuredMovies) return <Error statusCode={errorCode} />;
  return (
    <>
      <TitleHome
        featuredMoviesData={featuredMovies.slice(0, 4)}
        fetchLink="ssr/infinite-scrolling"
      >
        <TitleHomeMore
          moreMoviesData={featuredMovies.slice(4)}
          fetchLink="ssr/infinite-scrolling"
        />
      </TitleHome>
      <Director directorData={director} />
      <AllPostsInfiniteScrolling />
    </>
  );
}

export async function getServerSideProps() {
  const apolloClientFeatured = initializeApollo();
  const apolloClientDirector = initializeApollo();
  const apolloClientCache = initializeApollo();

  try {
    await apolloClientCache.query({
      query: MOVIES_FILTERS,
      variables: {
        start: 0,
        limit: 6,
        genre: "all",
        title: "",
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
  } catch (err) {
    return {
      props: {
        errorCode:
          err.graphqlErrors?.length !== 0 || err.networkErrors?.length !== 0
            ? "500"
            : "400",
      },
    };
  }
}
