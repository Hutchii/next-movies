import { useQuery } from "@apollo/client";
import { MOVIES_FILTERS_PAGINATION } from "../../libs/apolloQueries";
import AllPostGenres from "./AllPostsGenres";
import { useRef, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import AllPostsList from "./AllPostsList";
import AllPostsSearch from "./AllPostsSearch";
import AllPostsResults from "./AllPostsResults";
import Router, { useRouter } from "next/router";
import AllPostsPaginationUI from "./AllPostsPaginationUI";

export default function AllPosts() {
  const searchInput = useRef("");
  const { query } = useRouter();
  const pageQuery = +query.page || 1;
  const genreQuery = query.genre || "all";
  const searchQuery = query.search || "";
  const { error, data, fetchMore, refetch } = useQuery(
    MOVIES_FILTERS_PAGINATION,
    {
      variables: {
        page: 1,
        pageSize: 6,
        genre: "all",
        title: "",
      },
    }
  );
  const moviesData = data?.movies.data;
  const moviesDataTotal = data?.movies?.meta.pagination.total;
  const searchHandler = ({ target }) => {
    const search = target.value;
    refetch({
      genre: "all",
      title: search,
    });
    Router.push(`/ssr/pagination/?search=${search}`, undefined, {
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
          page: pageQuery,
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
            Router.push(`/ssr/pagination/?genre=${currentGenre}`, undefined, {
              shallow: true,
            });
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
        activeGenre="all"
        error={error}
        fetchLink="ssr/pagination"
      />
      <AllPostsPaginationUI
        data={moviesData}
        morePostsAmount={6}
        currentPage={pageQuery}
        pageSize={6}
        totalCount={moviesDataTotal}
        fetchMore={(sign, pageNumber = false) => {
          const pageCondition = pageNumber ? pageNumber : pageQuery + sign;
          fetchMore({
            variables: {
              page: pageCondition,
              genre: genreQuery,
              title: searchQuery,
            },
          });
          Router.push(
            `/ssr/pagination/?${query.genre ? `genre=${query.genre}&` : ""}${
              query.search ? `search=${query.search}&` : ""
            }page=${pageCondition}`,
            undefined,
            {
              shallow: true,
            }
          );
        }}
      />
    </section>
  );
}