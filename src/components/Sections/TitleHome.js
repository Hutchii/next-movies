import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import { dateConverter } from "../../libs/dateConverter";
import ButtonArrow from "../UI/ButtonArrow";
import { useState, useEffect } from "react";
import Link from "next/link";
import { directorsFormatter } from "../../libs/directorsFormatter";

export default function TitleHome({ featuredMoviesData, children, fetchLink }) {
  const [whichSlide, setWhichSlide] = useState(0);
  const maxSlides = featuredMoviesData.length - 1;

  const nextSlide = () =>
    setWhichSlide((prevValue) => (prevValue === maxSlides ? 0 : prevValue + 1));
  const prevSlide = () =>
    setWhichSlide((prevValue) => (prevValue === 0 ? maxSlides : prevValue - 1));

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (featuredMoviesData.length < 2 || mq.matches) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 15000);
    return () => clearInterval(interval);
  }, [whichSlide]);

  return (
    <main className="spacer">
      <div className="title-home--wrapper margin--header">
        <div className="title-home--slider">
          {featuredMoviesData.map((movie, i) => {
            return (
              <div
                key={movie.id}
                className={`title-home--slide ${
                  i === whichSlide ? "title-home--slide-active" : ""
                }`}
              >
                <div className="title-home--slide-wrapper">
                  <Link href={`/${fetchLink}/${movie.attributes.slug}`}>
                    <a>
                      <div className="title-home--slide-image">
                        <Image
                          src={imageUrlBuilder(
                            movie.attributes.image.data.attributes.url
                          )}
                          alt="Movie"
                          width={1024}
                          height={600}
                          priority={i === 0 ? true : false}
                          unoptimized
                          layout="responsive"
                        />
                      </div>
                    </a>
                  </Link>
                  <div className="title-home--slide-pagination">
                    {featuredMoviesData.map((dot, i) => {
                      return (
                        <div key={dot.id}>
                          <p
                            className={`color--grey title-home--slide-number ${
                              i === whichSlide
                                ? "title-home--slide-pagination--active"
                                : ""
                            }`}
                            onClick={() => setWhichSlide(i)}
                          >
                            {i + 1}
                          </p>
                          <div className="title-home--slide-progress" />
                        </div>
                      );
                    })}
                  </div>
                  <ButtonArrow prev onClickHandler={prevSlide} />
                  <ButtonArrow onClickHandler={nextSlide} />
                </div>
                <div className={`title-home--slide-text`}>
                  <div className="title-home--slide-info">
                    <p className="text--12 color--grey">
                      {dateConverter(movie.attributes.createdAt)}
                    </p>
                    <p className="text--12 color--gold">
                      {`By ${directorsFormatter(
                        movie.attributes.directors.data
                      )}`}
                    </p>
                  </div>
                  <h1 className="heading--30">{movie.attributes.title}</h1>
                  <p className="paragraph--18">
                    {movie.attributes.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {children}
      </div>
    </main>
  );
}
