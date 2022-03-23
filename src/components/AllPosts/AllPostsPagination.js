import { useQuery } from "@apollo/client";
import { MOVIES_FILTERS_PAGINATION } from "../../libs/apolloQueries";
import AllPostGenres from "./AllPostsGenres";
import { useRef, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import AllPostsList from "./AllPostsList";
import AllPostsSearch from "./AllPostsSearch";
import AllPostsButton from "./AllPostsButton";
import AllPostsResults from "./AllPostsResults";
import Router, { useRouter } from "next/router";
import AllPostsPaginationUI from "./AllPostsPaginationUI";

export default function AllPosts() {
  // const searchInput = useRef("");
  const { query } = useRouter();
  const pageLink = Number(query.page) || 1;
  const genreLink = query.genre || "all";
  console.log(query);
  const { error, data, fetchMore, refetch } = useQuery(
    MOVIES_FILTERS_PAGINATION,
    {
      variables: {
        page: 1,
        pageSize: 6,
        genre: "all",
        title: "",
      },
      //notifyOnNetworkStatusChange: true, //- Use only when using loading state. Otherwise it will re-render unnecessarily.
    }
  );
  const moviesData = data?.movies.data;
  const moviesDataLength = data?.movies?.data.length;
  const moviesDataTotal = data?.movies?.meta.pagination.total;
  const refetchHelper = (genre, title) =>
    refetch({
      page: 1,
      pageSize: 6,
      genre: genre,
      title: title,
    });
  const fetchMoreHelper = (pageCondition) =>
    fetchMore({
      variables: {
        page: pageCondition,
        pageSize: 6,
        genre: query.genre || "all",
        title: "",
      },
    });
  // const searchHandler = (event) => {
  //   const search = event.target.value;
  //   refetchHelper("all", search);
  //   Router.push(`/?search=${search}`, undefined, { shallow: true });
  // };
  // const debouncedSearchHandler = useMemo(
  //   () => debounce(searchHandler, 350),
  //   []
  // );
  useEffect(() => {
    if (query.genre && query.page) return fetchMoreHelper(pageLink);
    if (query.page) return fetchMoreHelper(pageLink);
    if (query.genre) return refetchHelper(genreLink, "");
  }, []);

  return (
    <section className="posts spacer">
      <div className="posts-menu margin--top">
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            // searchInput.current.value = "";
            refetchHelper(currentGenre, "");
            Router.push(`/ssr-pagination/?genre=${currentGenre}`, undefined, {
              shallow: true,
            });
          }}
          activeGenre={genreLink}
        />
        {/* <AllPostsSearch
          refHandler={searchInput}
          onChangeHandler={debouncedSearchHandler}
        /> */}
      </div>
      <AllPostsResults moviesDataTotal={moviesDataTotal} />
      <AllPostsList moviesData={moviesData} activeGenre="all" error={error} />
      <AllPostsPaginationUI
        data={moviesData}
        morePostsAmount={6}
        totalCount={moviesDataTotal}
        fetchMore={(sign, pageNumber = false) => {
          const pageCondition = pageNumber ? pageNumber : pageLink + sign;
          fetchMoreHelper(pageCondition);
          Router.push(
            `/ssr-pagination/?${
              query.genre ? `genre=${query.genre}&` : ""
            }page=${pageCondition}`,
            undefined,
            {
              shallow: true,
            }
          );
        }}
        currentPage={pageLink}
        pageSize={6}
      />
    </section>
  );
}
