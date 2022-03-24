import { useQuery } from "@apollo/client";
import { MOVIES_FILTERS } from "../../libs/apolloQueries";
import AllPostGenres from "./AllPostsGenres";
import { useRef, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import AllPostsList from "./AllPostsList";
import AllPostsSearch from "./AllPostsSearch";
import AllPostsResults from "./AllPostsResults";
import Router, { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";

export default function AllPostsInfiniteScrolling() {
  const searchInput = useRef("");
  const { query } = useRouter();
  const genreQuery = query.genre || "all";
  const searchQuery = query.search || "";
  const { error, data, fetchMore, refetch } = useQuery(MOVIES_FILTERS, {
    variables: {
      start: 0,
      limit: 6,
      genre: "all",
      title: "",
    },
  });
  const moviesData = data?.movies.data;
  const moviesDataLength = data?.movies?.data.length;
  const moviesDataTotal = data?.movies?.meta.pagination.total;
  const areMoreMovies = moviesDataLength >= moviesDataTotal;

  const searchHandler = ({ target }) => {
    const search = target.value;
    refetch({
      genre: "all",
      title: search,
    });
    Router.push(`/ssr/infinite-scrolling/?search=${search}`, undefined, {
      shallow: true,
    });
  };
  const debouncedSearchHandler = useMemo(
    () => debounce(searchHandler, 350),
    []
  );
  useEffect(() => {
    if (Object.keys(query).length !== 0) {
      fetchMore({
        variables: {
          genre: genreQuery,
          title: searchQuery,
        },
      });
    }
  }, []);
  return (
    <section className="posts spacer">
      <div className="posts-menu margin--top">
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            searchInput.current.value = "";
            refetch({
              genre: currentGenre,
              title: "",
            });
            Router.push(
              `/ssr/infinite-scrolling/?genre=${currentGenre}`,
              undefined,
              {
                shallow: true,
              }
            );
          }}
          activeGenre={genreQuery}
        />
        <AllPostsSearch
          refHandler={searchInput}
          onChangeHandler={debouncedSearchHandler}
        />
      </div>
      <AllPostsResults moviesDataTotal={moviesDataTotal} />
      <InfiniteScroll
        pageStart={0}
        loadMore={() =>
          fetchMore({
            variables: {
              start: 0,
              limit: moviesDataLength + 6,
              genre: genreQuery,
              title: searchQuery,
            },
          })
        }
        hasMore={!areMoreMovies}
      >
        <AllPostsList
          moviesData={moviesData}
          activeGenre={genreQuery}
          activeSearch={searchQuery}
          error={error}
          fetchLink="ssr/infinite-scrolling"
        />
      </InfiniteScroll>
    </section>
  );
}
