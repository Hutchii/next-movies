import MoviesGenres from "./MoviesGenres";
import { useRef, useMemo } from "react";
import { debounce } from "lodash";
import MoviesList from "./MoviesList";
import MoviesSearch from "./MoviesSearch";
import MoviesPagination from "./MoviesPagination";
import MoviesResults from "./MoviesResults";
import Router, { useRouter } from "next/router";
import styled from "styled-components";

export default function AllPosts({ data }) {
  const { query } = useRouter();
  const pageQuery = +query.page || 1;
  const genreQuery = query.genre || "all";
  const searchQuery = query.search || "";
  const searchInput = useRef("");

  const filteredData = useMemo(() => {
    if (!query.genre && !query.search) return data;
    const filterMethods = [
      {
        condition: query.genre,
        flt(a) {
          return a.attributes.genres.data.some(
            (b) => b.attributes.title === this.condition
          );
        },
      },
      {
        condition: query.search,
        flt(a) {
          return a.attributes.title
            .toLowerCase()
            .includes(this.condition?.toLowerCase());
        },
      },
    ];
    return data.filter((item) => {
      for (let i = 0; i < filterMethods.length; i++) {
        if (!filterMethods[i].condition) continue;
        if (!filterMethods[i].flt(item)) return false;
      }
      return true;
    });
  }, [data, query.genre, query.search]);

  const debouncedSearchHandler = useMemo(
    () =>
      debounce(
        ({ target }) =>
          Router.push(
            {
              pathname: "/movies",
              query: {
                genre: query.genre,
                search: target.value,
              },
            },
            undefined,
            {
              shallow: true,
            }
          ),
        350
      ),
    []
  );
  const filteredDataLength = filteredData?.length;

  return (
    <main className="spacer center">
      <FiltersStyled>
        <MoviesGenres
          onClickHandler={(currentGenre) => {
            searchInput.current.value = "";
            Router.push(
              {
                pathname: "/movies",
                query: {
                  genre: currentGenre,
                },
              },
              undefined,
              {
                shallow: true,
              }
            );
          }}
          activeGenre={genreQuery}
        />
        <MoviesSearch
          refHandler={searchInput}
          onChangeHandler={debouncedSearchHandler}
        />
      </FiltersStyled>
      <MoviesResults moviesDataTotal={filteredDataLength} />
      <MoviesList
        moviesData={filteredData.slice(pageQuery * 6 - 6, pageQuery * 6)}
        activeGenre={genreQuery}
        activeSearch={searchQuery}
      />
      <MoviesPagination
        pageQuery={query.page}
        morePostsAmount={6}
        pageSize={6}
        currentPage={pageQuery}
        totalCount={filteredDataLength}
        fetchMore={(sign, pageNumber = false) =>
          Router.push(
            {
              pathname: "/movies",
              query: {
                ...query,
                page: pageNumber ? pageNumber : pageQuery + sign,
              },
            },
            undefined,
            {
              shallow: true,
            }
          )
        }
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