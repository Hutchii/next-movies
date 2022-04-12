import { initializeApollo, addApolloState } from "../../../libs/apolloClient";
import {
  FEATURED_MOVIES,
  DIRECTOR,
  MOVIES_FILTERS_PAGINATION,
} from "../../../libs/apolloQueries";
import Title from "../../../components/Title/Title";
import Director from "../../../components/Director/Director";
import AllPostsPagination from "../../../components/AllPosts/AllPostsPagination";
import TitleMore from "../../../components/Title/TitleMore";
import Error from "next/error";
import Head from "next/head";

export default function SSRPagination({ featuredMovies, director, errorCode }) {
  if (!featuredMovies) return <Error statusCode={errorCode} />;
  return (
    <>
      <Head>
        <title>Server Side Rendering - Pagination</title>
      </Head>
      <Title
        featuredMoviesData={featuredMovies.slice(0, 4)}
        fetchLink="ssr/pagination"
      >
        <TitleMore
          moreMoviesData={featuredMovies.slice(4)}
          fetchLink="ssr/pagination"
        />
      </Title>
      <Director directorData={director} />
      {/* <AllPostsPagination /> */}
    </>
  );
}

export async function getServerSideProps() {
  const apolloClientFeatured = initializeApollo();
  const apolloClientDirector = initializeApollo();
  const apolloClientCache = initializeApollo();

  try {
    await apolloClientCache.query({
      query: MOVIES_FILTERS_PAGINATION,
      variables: {
        page: 1,
        pageSize: 6,
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
