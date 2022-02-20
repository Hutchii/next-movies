import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import { dateConverter } from "../../libs/dateConverter";

export default function TitleHome({ featuredMoviesData }) {
  console.log(featuredMoviesData);
  return (
    <main className="spacer">
      {featuredMoviesData.map((movie) => {
        return (
          <div key={movie.id} className="title-home--slider">
            <div className="title-home--slider-image">
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
            <div className="title-home--slider-text">
              <div className="title-home--slider-info">
                <p className="text--14 color--grey">
                  {dateConverter(movie.attributes.createdAt)}
                </p>
                <p className="text--14 color--gold">By Sebastian Blaik</p>
              </div>
              <h1 className="heading--30">{movie.attributes.title}</h1>
              <p className="paragraph--18">{movie.attributes.description}</p>
            </div>
          </div>
        );
      })}
    </main>
  );
}
