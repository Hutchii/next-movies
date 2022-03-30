import Link from "next/link";
import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import { dateConverter } from "../../libs/dateConverter";
import Message from "../UI/Message";
import { directorsFormatter } from "../../libs/directorsFormatter";

export default function AllPostsList({
  moviesData,
  activeGenre,
  activeSearch,
  error,
  fetchLink,
}) {
  const dataLength = moviesData.length === 0;
  if (activeGenre === "all" && !activeSearch && dataLength)
    return <Message message="Unfortunately there are no movies." />;
  if (!activeSearch && dataLength)
    return (
      <Message message={`Unfortunately there are no ${activeGenre} movies.`} />
    );
  if (activeSearch && dataLength)
    return <Message message="No results found." />;
  if (error) return <Message message="Error occured. Try again." />;
  return (
    <>
      <div className="posts-cards">
        {moviesData?.map((movie) => {
          return (
            <Link
              key={movie.id}
              href={`/${fetchLink}/${movie.attributes.slug}`}
            >
              <a className="posts-cards--link">
                <div className="posts-cards--post">
                  <div className="posts-cards--image">
                    <Image
                      src={imageUrlBuilder(
                        movie.attributes.image.data.attributes.formats.medium
                          .url
                      )}
                      alt="Movie"
                      width={750}
                      height={439}
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
                      <p className="text--12 color--gold">{`By ${directorsFormatter(
                        movie.attributes.directors.data
                      )}`}</p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
}
