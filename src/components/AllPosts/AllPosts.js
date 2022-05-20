import AllPostGenres from "./AllPostsGenres";
import { useRef, useMemo } from "react";
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

  const filterData = useMemo(() => {
    let results = data;
    if (genreQuery !== "all")
      results = data.filter((el) =>
        el.attributes.genres.data.some(
          (el) => el.attributes.title === genreQuery
        )
      );
    if (searchQuery !== "")
      results = results.filter((el) =>
        el.attributes.title.includes(searchQuery)
      );
    return results;
  }, [searchQuery, genreQuery, data]);

  const filterDataLength = filterData.length;

  const searchHelper = ({ target }) => {
    const search = target.value;
    const searchEmpty = search !== "";
    Router.push(
      `/movies/${searchEmpty || query.genre ? "?" : ""}${
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
  return (
    <main className="spacer center">
      <FiltersStyled>
        <AllPostGenres
          onClickHandler={(currentGenre) => {
            searchInput.current.value = "";
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
        <AllPostsSearch
          refHandler={searchInput}
          onChangeHandler={debouncedSearchHandler}
        />
      </FiltersStyled>
      <AllPostsResults moviesDataTotal={filterDataLength} />
      <AllPostsList
        moviesData={filterData.slice(pageQuery * 6 - 6, pageQuery * 6)}
        activeGenre={genreQuery}
        activeSearch={searchQuery}
      />
      <AllPostsPaginationUI
        morePostsAmount={6}
        pageSize={6}
        currentPage={pageQuery}
        totalCount={filterDataLength}
        fetchMore={(sign, pageNumber = false) => {
          const pageCondition = pageNumber ? pageNumber : pageQuery + sign;
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
