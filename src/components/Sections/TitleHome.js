import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import { dateConverter } from "../../libs/dateConverter";
import TitleHomeMore from "./TitleHomeMore";
import ButtonArrow from "../UI/ButtonArrow";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProgressBar from "../Elements/ProgressBar";

export default function TitleHome({ featuredMoviesData, moreMoviesData }) {
  const [hide, setHide] = useState(false);
  const [whichSlide, setWhichSlide] = useState(0);
  const maxSlides = featuredMoviesData.length - 1;
  const timer = 15000;
  const nextSlide = () =>
    setWhichSlide((prevValue) => (prevValue === maxSlides ? 0 : prevValue + 1));
  const prevSlide = () =>
    setWhichSlide((prevValue) => (prevValue === 0 ? maxSlides : prevValue - 1));

  useEffect(() => {
    if (featuredMoviesData.length < 2) return;
    const interval = setInterval(() => {
      nextSlide();
    }, timer);

    return () => clearInterval(interval);
  }, [whichSlide]);

  return (
    <main className="spacer">
      <div className="title-home--slider">
        {featuredMoviesData.map((movie, i) => {
          return (
            <div key={movie.id} className={`title-home--slide`}>
              <div
                className={`title-home--slide-wrapper ${
                  i === whichSlide ? "title-home--image-active" : ""
                }`}
                onMouseEnter={() => setHide(true)}
                onMouseLeave={() => setHide(false)}
              >
                <Link href={`/${movie.attributes.slug}`}>
                  <a>
                    <div className={`title-home--slide-image`}>
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
                  </a>
                </Link>
                <div className="title-home--slide-pagination">
                  {featuredMoviesData.map((dot, i) => {
                    return (
                      <div key={dot.id}>
                        <p
                          className={`title-home--slide-number color--grey ${
                            i === whichSlide
                              ? "title-home--slide-pagination--active"
                              : ""
                          }`}
                          onClick={() => setWhichSlide(i)}
                        >
                          {i + 1}
                        </p>
                        <div
                          className={`title-home--slide-progress ${
                            i === whichSlide
                              ? "title-home--slide-progress-active"
                              : ""
                          }`}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                <ButtonArrow
                  prev
                  hoverHandler={hide}
                  onClickHandler={prevSlide}
                />
                <ButtonArrow hoverHandler={hide} onClickHandler={nextSlide} />
              </div>
              <div
                className={`title-home--slide-text ${
                  i === whichSlide ? "title-home--text-active" : ""
                }`}
              >
                <div className="title-home--slide-info">
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
      </div>
      <TitleHomeMore moreMoviesData={moreMoviesData} />
    </main>
  );
}
