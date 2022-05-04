import { initializeApollo, addApolloState } from "../../../libs/apolloClient";
import { FEATURED_MOVIES } from "../../../libs/apolloQueries";
import Title from "../../../components/Title/Title";
import Director from "../../../components/Director/Director";
import AllPosts from "../../../components/AllPosts/AllPosts";
import TitleMore from "../../../components/Title/TitleMore";
import Error from "next/error";
import Head from "next/head";
import SpecialPosts from "../../../components/Sections/SpecialPosts";
import Articles from "../../../components/Articles/Articles";

export default function SSRLoadMore({ featuredMovies, errorCode }) {
  if (!featuredMovies) return <Error statusCode={errorCode} />;
  return (
    <>
      <Head>
        <title>Server Side Rendering - Load More</title>
      </Head>
      <Title
        featuredMoviesData={featuredMovies.slice(0, 4)}
        fetchLink="ssr/load-more"
      >
        <TitleMore
          moreMoviesData={featuredMovies.slice(4)}
          fetchLink="ssr/load-more"
        />
      </Title>
      <Director />
      <Articles />
      {/* <SpecialPosts data={featuredMovies.slice(0, 4)} />
      <AllPosts /> */}
    </>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );
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
