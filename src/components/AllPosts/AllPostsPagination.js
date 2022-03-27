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
  const {
    error,
    data: { movies },
    fetchMore,
  } = useQuery(MOVIES_FILTERS_PAGINATION, {
    variables: {
      page: 1,
      pageSize: 6,
      genre: "all",
      title: "",
    },
  });
  const moviesData = movies?.data;
  const moviesDataTotal = movies?.meta.pagination.total;

  const fetchMoreHelper = (genre, search, page = 1) =>
    fetchMore({
      variables: {
        page: page,
        genre: genre,
        title: search,
      },
    });

  const searchHelper = ({ target }) => {
    const search = target.value;
    const searchEmpty = search !== "";
    fetchMoreHelper(genreQuery, search);
    Router.push(
      `/ssr/pagination/${searchEmpty || query.genre ? "?" : ""}${
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
      fetchMoreHelper(genreQuery, searchQuery, pageQuery);
  }, []);

  return (
    <section className="posts spacer">
      <div className="posts-menu margin--top">
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            searchInput.current.value = "";
            fetchMoreHelper(currentGenre, "");
            Router.push(
              `/ssr/pagination/${
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
        activeGenre="all"
        error={error}
        fetchLink="ssr/pagination"
      />
      <AllPostsPaginationUI
        data={moviesData}
        morePostsAmount={6}
        pageSize={6}
        currentPage={pageQuery}
        totalCount={moviesDataTotal}
        fetchMore={(sign, pageNumber = false) => {
          const pageCondition = pageNumber ? pageNumber : pageQuery + sign;
          fetchMoreHelper(genreQuery, searchQuery, pageCondition);
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
