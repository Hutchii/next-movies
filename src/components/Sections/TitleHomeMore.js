import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import { dateConverter } from "../../libs/dateConverter";
import Button from "../UI/Button";
import Link from "next/link";

export default function TitleHomeMore({ moreMoviesData, fetchLink }) {
  return (
    <div className="title-home--more-wrapper">
      <h2 className="text--16 title-home--heading">More movies</h2>
      <div className="title-home--more">
        {moreMoviesData.map((movie) => {
          return (
            <Link
              key={movie.id}
              href={`/${fetchLink}/${movie.attributes.slug}`}
            >
              <a className="title-home--link">
                <div className="title-home--aside">
                  <div className="title-home--image">
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
                  <div className="title-home--text">
                    <p className="text--12 color--grey">
                      {dateConverter(movie.attributes.createdAt)}
                    </p>
                    <h1 className="heading--20">{movie.attributes.title}</h1>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
        <Button buttonName="view all" dark />
      </div>
    </div>
  );
}
