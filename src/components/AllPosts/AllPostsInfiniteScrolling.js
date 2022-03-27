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
  const {
    error,
    data: { movies },
    fetchMore,
    refetch,
  } = useQuery(MOVIES_FILTERS, {
    variables: {
      start: 0,
      limit: 6,
      genre: "all",
      title: "",
    },
  });
  const moviesData = movies?.data;
  const moviesDataLength = movies?.data.length;
  const moviesDataTotal = movies?.meta.pagination.total;
  const areMoreMovies = moviesDataLength >= moviesDataTotal;

  const fetchMoreHelper = (genre, search, limit = 6) =>
    fetchMore({
      variables: {
        limit: limit,
        genre: genre,
        title: search,
      },
    });

  const searchHelper = ({ target }) => {
    const search = target.value;
    const searchEmpty = search !== "";
    fetchMoreHelper(genreQuery, search);
    Router.push(
      `/ssr/infinite-scrolling/${searchEmpty || query.genre ? "?" : ""}${
        query.genre ? `genre=${query.genre}${searchEmpty ? "&" : ""}` : ""
      }${searchEmpty ? `search=${search}` : ""}`,
      undefined,
      {
        shallow: true,
      }
    );
  };
  const debouncedSearchHandler = useMemo(
    () => debounce(searchHelper, 350),
    [query.genre]
  );
  useEffect(() => {
    if (Object.keys(query).length !== 0)
      fetchMoreHelper(genreQuery, searchQuery);
  }, []);
  
  return (
    <section className="posts spacer">
      <div className="posts-menu margin--top">
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            searchInput.current.value = "";
            fetchMoreHelper(currentGenre, "");
            Router.push(
              `/ssr/infinite-scrolling/${
                currentGenre !== "all" ? `?genre=${currentGenre}` : ""
              }`,
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
          fetchMoreHelper(genreQuery, searchQuery, moviesDataLength + 6)
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
