import Button from "../UI/Button";
import { useQuery, useLazyQuery, NetworkStatus } from "@apollo/client";
import { MOVIES_FILTERS } from "../../libs/apolloQueries";
import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import { dateConverter } from "../../libs/dateConverter";
import Link from "next/link";
import PostGenres from "./PostsGenres";
import { useState, useEffect, useRef, useMemo } from "react";
import PostsSearch from "./PostsSearch";
import Search from "../../../public/svg/Search.svg";
import { debounce } from "lodash";

const listedGenres = ["all", "drama", "romance", "war", "thriller"];

export default function AllPosts() {
  const [activeGenre, setActiveGenre] = useState("all");
  const inputEl = useRef(null);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    MOVIES_FILTERS,
    {
      variables: {
        start: 0,
        limit: 6,
        genre: "all",
        title: "",
      },
      notifyOnNetworkStatusChange: true,
    }
  );
  const cacheData = data?.movies.data;
  const dataLength = data?.movies?.data.length;
  const totalLength = data?.movies?.meta.pagination.total;
  const postsSizeChange = () =>
    fetchMore({
      variables: {
        start: 0,
        limit: dataLength + 6,
      },
    });
  const searchHandler = (event) => {
    setActiveGenre("");
    const search = event.target.value;
    refetch({
      start: 0,
      limit: 6,
      genre: "all",
      title: search,
    });
  };
  const debouncedSearchHandler = useMemo(
    () => debounce(searchHandler, 300),
    [activeGenre]
  );
  return (
    <section className="posts spacer">
      <div className="posts-menu margin--top">
        <div className="posts-filters">
          {listedGenres.map((genre, i) => {
            return (
              <PostGenres
                key={genre + i}
                genreName={genre}
                onClickHandler={() => {
                  refetch({
                    start: 0,
                    limit: 6,
                    genre: genre,
                    title: "",
                  });
                  inputEl.current.value = "";
                }}
                onClickStateHandler={(activeGenre) =>
                  setActiveGenre(activeGenre)
                }
                activeGenre={activeGenre}
              />
            );
          })}
        </div>
        <div className="posts-search">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search"
            onChange={debouncedSearchHandler}
          />
          <div className="posts-search-icon">
            <Search />
          </div>
        </div>
      </div>
      <p className="text--14 posts-results">
        {totalLength} <span className="color--grey">results</span>
      </p>
      <div className="posts-cards">
        {cacheData?.map((movie) => {
          return (
            <Link key={movie.id} href={`/${movie.attributes.slug}`}>
              <a className="posts-cards--link">
                <div className="posts-cards--post">
                  <div className="posts-cards--image">
                    <Image
                      src={imageUrlBuilder(
                        movie.attributes.image.data.attributes.url
                      )}
                      alt="Movie"
                      width={1024}
                      height={600}
                      priority
                      unoptimized
                    />
                  </div>
                  <div className="posts-cards--text spacer">
                    <div className="posts-cards--content">
                      <h1 className="heading--26">{movie.attributes.title}</h1>
                      <p className="paragraph--18">
                        {movie.attributes.description}
                      </p>
                    </div>
                    <div className="posts-cards--info">
                      <p className="text--12 color--grey">
                        {dateConverter(movie.attributes.createdAt)}
                      </p>
                      <p className="text--12 color--gold">By Sebastian Blaik</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
      <div className="posts-cards--button center">
        <button
          className="button button--dark"
          onClick={postsSizeChange}
          disabled={dataLength >= totalLength}
        >
          load more
        </button>
      </div>
    </section>
  );
}
