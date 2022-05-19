import { useQuery } from "@apollo/client";
import { MOVIES_FILTERS_PAGINATION } from "../../libs/apolloQueries";
import AllPostGenres from "./AllPostsGenres";
import { useRef, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import AllPostsList from "./AllPostsList";
import AllPostsSearch from "./AllPostsSearch";
import AllPostsPaginationUI from "./AllPostsPaginationUI";
import AllPostsResults from "./AllPostsResults";
import Router, { useRouter } from "next/router";
import styled from "styled-components";

export default function AllPosts({ data }) {
  const searchInput = useRef("");
  const { query } = useRouter();
  const pageQuery = +query.page || 1;
  const genreQuery = query.genre || "all";
  const searchQuery = query.search || "";

  let dataLength = data.length;
  // const dataSliced = data.slice(pageQuery * 6 - 6, pageQuery * 6);
  // const data2 = data;
  // const dataFinal = data2.flatMap((el) =>
  //   el.attributes.genres.data.filter((el) => el.attributes.title === "thriller")
  // );
  const test = () => {
    let results = data;
    if (genreQuery !== "all")
      results = results.filter((el) =>
        el.attributes.genres.data.some(
          (el) => el.attributes.title === genreQuery
        )
      );
    if (searchQuery !== "")
      results.filter((el) => el.attributes.title.includes(searchQuery));
    dataLength = results.length;
    return results.slice(pageQuery * 6 - 6, pageQuery * 6);
  };

  const finalData = test();

  // const {
  //   error,
  //   data: { movies },
  //   fetchMore,
  // } = useQuery(MOVIES_FILTERS_PAGINATION, {
  //   variables: {
  //     page: 1,
  //     pageSize: 6,
  //     genre: "all",
  //     title: "",
  //   },
  // });
  // const moviesData = movies?.data;
  // const moviesDataTotal = movies?.meta.pagination.total;

  // const fetchMoreHelper = (genre, search, page = 1) =>
  //   fetchMore({
  //     variables: {
  //       page: page,
  //       genre: genre,
  //       title: search,
  //     },
  //   });

  // const searchHelper = ({ target }) => {
  //   const search = target.value;
  //   const searchEmpty = search !== "";
  //   fetchMoreHelper(genreQuery, search);
  //   Router.push(
  //     `/ssr/pagination/${searchEmpty || query.genre ? "?" : ""}${
  //       query.genre ? `genre=${query.genre}${searchEmpty ? "&" : ""}` : ""
  //     }${searchEmpty ? `search=${search}` : ""}`,
  //     undefined,
  //     {
  //       shallow: true,
  //     }
  //   );
  // };
  // const debouncedSearchHandler = useMemo(
  //   () => debounce(searchHelper, 350),
  //   [query.genre]
  // );
  // useEffect(() => {
  //   if (Object.keys(query).length !== 0)
  //     fetchMoreHelper(genreQuery, searchQuery, pageQuery);
  // }, []);

  return (
    <main className="spacer center">
      <FiltersStyled>
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            // searchInput.current.value = "";
            Router.push(
              `/movies/${
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
        {/* <AllPostsSearch
          refHandler={searchInput}
          onChangeHandler={debouncedSearchHandler}
        /> */}
      </FiltersStyled>
      {/* <AllPostsResults moviesDataTotal={moviesDataTotal} /> */}
      <AllPostsList
        moviesData={finalData}
        activeGenre={genreQuery}
        activeSearch={searchQuery}
        // error={error}
        fetchLink="ssr/load-more"
      />
      <AllPostsPaginationUI
        morePostsAmount={6}
        pageSize={6}
        currentPage={pageQuery}
        totalCount={dataLength}
        fetchMore={(sign, pageNumber = false) => {
          const pageCondition = pageNumber ? pageNumber : pageQuery + sign;
          // fetchMoreHelper(genreQuery, searchQuery, pageCondition);
          Router.push(
            `/movies?${query.genre ? `genre=${query.genre}&` : ""}${
              query.search ? `search=${query.search}&` : ""
            }page=${pageCondition}`,
            undefined,
            {
              shallow: true,
            }
          );
        }}
      />
    </main>
  );
}

const FiltersStyled = styled.div`
  @media (min-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
