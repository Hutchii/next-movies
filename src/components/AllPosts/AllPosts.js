import { useQuery } from "@apollo/client";
import { MOVIES_FILTERS } from "../../libs/apolloQueries";
import AllPostGenres from "./AllPostsGenres";
import { useRef, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import AllPostsList from "./AllPostsList";
import AllPostsSearch from "./AllPostsSearch";
import AllPostsButton from "./AllPostsButton";
import AllPostsResults from "./AllPostsResults";
import Router, { useRouter } from "next/router";

export default function AllPosts(props) {
  const searchInput = useRef("");
  const { query } = useRouter();
  const genreQuery = query.genre || "all";
  const searchQuery = query.search || "";
  const { loading, error, data, fetchMore, refetch, client } = useQuery(
    MOVIES_FILTERS,
    {
      variables: {
        start: 0,
        limit: 4,
        genre: "all",
        title: "",
      },
      // fetchPolicy: "cache-first"
      // notifyOnNetworkStatusChange: true,
    }
  );

  const moviesData = data?.movies?.data;
  const moviesDataLength = data?.movies?.data.length;
  const moviesDataTotal = data?.movies?.meta.pagination.total;
  const areMoreMovies = moviesDataLength >= moviesDataTotal;

  const refetchHelper = (genre, search, limit = 6) =>
    refetch({
      limit: limit,
      genre: genre,
      title: search,
    });

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
      `/ssr/load-more/${searchEmpty || query.genre ? "?" : ""}${
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
    <section className="posts spacer" id="posts">
      <div className="posts-menu margin--top">
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            searchInput.current.value = "";
            fetchMoreHelper(currentGenre, "");
            // refetchHelper(currentGenre, "");
            Router.push(
              `/ssr/load-more/${
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
      <AllPostsList
        moviesData={moviesData}
        activeGenre={genreQuery}
        activeSearch={searchQuery}
        error={error}
        fetchLink="ssr/load-more"
        loading={loading}
      />
      {!areMoreMovies && (
        <div className="posts-cards--button center">
          <AllPostsButton
            onClickHandler={() =>
              fetchMoreHelper(genreQuery, searchQuery, moviesDataLength + 6)
            }
            areMoreMovies={areMoreMovies}
          />
        </div>
      )}
    </section>
  );
}
