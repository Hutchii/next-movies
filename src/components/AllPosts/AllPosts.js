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

export default function AllPosts() {
  const searchInput = useRef("");
  const { query } = useRouter();
  const genreLink = query.genre || "all";
  const searchLink = query.search;
  const { error, data, fetchMore, refetch } = useQuery(MOVIES_FILTERS, {
    variables: {
      start: 0,
      limit: 6,
      genre: "all",
      title: "",
    },
    //notifyOnNetworkStatusChange: true, //- Use only when using loading state. Otherwise it will re-render unnecessarily.
  });
  const moviesData = data?.movies.data;
  const moviesDataLength = data?.movies?.data.length;
  const moviesDataTotal = data?.movies?.meta.pagination.total;
  const areMoreMovies = moviesDataLength >= moviesDataTotal;

  const refetchHelper = (genre, title) =>
    refetch({
      start: 0,
      limit: 6,
      genre: genre,
      title: title,
    });
  const searchHandler = (event) => {
    const search = event.target.value;
    refetchHelper("all", search);
    Router.push(`/?search=${search}`, undefined, { shallow: true });
  };
  const debouncedSearchHandler = useMemo(
    () => debounce(searchHandler, 350),
    []
  );
  useEffect(() => {
    query.genre && refetchHelper(query.genre, "");
    query.search && refetchHelper("all", query.search);
  }, []);
  return (
    <section className="posts spacer">
      <div className="posts-menu margin--top">
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            searchInput.current.value = "";
            refetchHelper(currentGenre, "");
            Router.push(`/?genre=${currentGenre}`, undefined, {
              shallow: true,
            });
          }}
          activeGenre={genreLink}
        />
        <AllPostsSearch
          refHandler={searchInput}
          onChangeHandler={debouncedSearchHandler}
        />
      </div>
      <AllPostsResults moviesDataTotal={moviesDataTotal} />
      <AllPostsList
        moviesData={moviesData}
        activeGenre={genreLink}
        activeSearch={searchLink}
        error={error}
      />
      {!areMoreMovies && (
        <AllPostsButton
          onClickHandler={() =>
            fetchMore({
              variables: {
                start: 0,
                limit: moviesDataLength + 6,
              },
            })
          }
          areMoreMovies={areMoreMovies}
        />
      )}
    </section>
  );
}
