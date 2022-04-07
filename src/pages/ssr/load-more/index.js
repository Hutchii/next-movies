import { initializeApollo, addApolloState } from "../../../libs/apolloClient";
import { FEATURED_MOVIES } from "../../../libs/apolloQueries";
import TitleHome from "../../../components/Sections/TitleHome";
import Director from "../../../components/Sections/Director";
import AllPosts from "../../../components/AllPosts/AllPosts";
import TitleHomeMore from "../../../components/Sections/TitleHomeMore";
import Error from "next/error";
import Head from "next/head";

export default function SSRLoadMore({ featuredMovies, errorCode }) {
  if (!featuredMovies) return <Error statusCode={errorCode} />;
  return (
    <>
      <Head>
        <title>Server Side Rendering - Load More</title>
      </Head>
      <TitleHome
        featuredMoviesData={featuredMovies.slice(0, 4)}
        fetchLink="ssr/load-more"
      >
        <TitleHomeMore
          moreMoviesData={featuredMovies.slice(4)}
          fetchLink="ssr/load-more"
        />
      </TitleHome>
      <Director />
      <AllPosts />
    </>
  );
}

export async function getServerSideProps({ res }) {
  // res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=30, stale-while-revalidate=59"
  // );
  const apolloClientFeatured = initializeApollo();
  try {
    const { data: featuredData } = await apolloClientFeatured.query({
      query: FEATURED_MOVIES,
    });
    return addApolloState(apolloClientFeatured, {
      props: {
        featuredMovies: featuredData.movies.data,
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
