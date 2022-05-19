import { dateConverter } from "../../libs/dateConverter";
import ButtonSlider from "../UI/ButtonSlider";
import { useState, useEffect } from "react";
import { directorsFormatter } from "../../libs/directorsFormatter";
import styled, { keyframes, css } from "styled-components";
import TitleImage from "./TitleImage";

const timer = 15000;

export default function Title({ featuredMoviesData, children }) {
  const [whichSlide, setWhichSlide] = useState(0);
  const maxSlides = featuredMoviesData.length - 1;

  const nextSlide = () =>
    setWhichSlide((prevValue) => (prevValue === maxSlides ? 0 : prevValue + 1));
  const prevSlide = () =>
    setWhichSlide((prevValue) => (prevValue === 0 ? maxSlides : prevValue - 1));

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (featuredMoviesData.length < 2 || mq.matches) return;
    const interval = setInterval(() => nextSlide(), timer);
    return () => clearInterval(interval);
  }, [whichSlide, featuredMoviesData.length]);

  return (
    <main className="spacer center">
      <WrapperStyled>
        <SliderStyled>
          {featuredMoviesData.map((movie, i) => {
            const isActive = i === whichSlide;
            return (
              <SlideStyled key={movie.id} active={isActive}>
                <ImageWrapperStyled active={isActive}>
                  <TitleImage
                    imageUrl={movie.attributes.image.data.attributes.url}
                    link={`/${movie.attributes.slug}`}
                    index={i}
                  />
                  <PaginationStyled>
                    {featuredMoviesData.map((dot, i) => {
                      return (
                        <div key={dot.id}>
                          <PaginationDotStyled
                            active={i === whichSlide}
                            onClick={() => setWhichSlide(i)}
                          >
                            {i + 1}
                          </PaginationDotStyled>
                          <PaginationProgressStyled active={i === whichSlide} />
                        </div>
                      );
                    })}
                  </PaginationStyled>
                  <ButtonSlider onClickHandler={prevSlide} prev />
                  <ButtonSlider onClickHandler={nextSlide} />
                </ImageWrapperStyled>
                <ContentStyled active={isActive}>
                  <ContentInfoStyled>
                    <DateStyled>
                      {dateConverter(movie.attributes.createdAt)}
                    </DateStyled>
                    <DirectorStyled>
                      {`By ${directorsFormatter(
                        movie.attributes.directors.data
                      )}`}
                    </DirectorStyled>
                  </ContentInfoStyled>
                  <HeadingStyled>{movie.attributes.title}</HeadingStyled>
                  <TextStyled>{movie.attributes.description}</TextStyled>
                </ContentStyled>
              </SlideStyled>
            );
          })}
        </SliderStyled>
        {children}
      </WrapperStyled>
    </main>
  );
}

const WrapperStyled = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    gap: 5rem;
  }
  @media (min-width: 1440px) {
    gap: 8rem;
  }
`;
const SliderStyled = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template: 1fr / 1fr;
    z-index: 10;
  }
  @media (min-width: 1024px) {
    flex: 1 1 70%;
  }
`;
const SlideStyled = styled.div`
  & + & {
    margin-top: 7rem;
  }
  @media (min-width: 768px) {
    position: relative;
    grid-row: 1/2;
    grid-column: 1/2;
    z-index: ${({ active }) => (active ? "100" : "0")};
    & + & {
      margin-top: 0;
    }
  }
`;
const ImageWrapperStyled = styled.div`
  @media (min-width: 768px) {
    overflow: hidden;
    position: relative;
    opacity: ${({ active }) => (active ? "1" : "0")};
    pointer-events: ${({ active }) => (active ? "unset" : "none")};
    z-index: 100;
    transition: all 1500ms cubic-bezier(0.2, 0, 0.2, 1);
    &:hover button {
      opacity: 1;
    }
  }
`;
const PaginationStyled = styled.div`
  display: none;
  @media (min-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    font-size: 1.4rem;
    width: 100%;
  }
`;
const PaginationDotStyled = styled.p`
  font-family: var(--inter);
  color: ${({ active }) => (active ? "var(--white)" : "var(--grey)")};
  transition: color 350ms cubic-bezier(0.2, 0, 0.2, 1);
  cursor: pointer;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 1.4rem;
  font-weight: 500;
  @media (min-width: 768px) {
    margin-bottom: 1.6rem;
  }
`;
const progressAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;
const PaginationProgressStyled = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: unset;
    position: absolute;
    width: 100%;
    height: 0.3rem;
    background-color: var(--gold);
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    animation: ${({ active }) =>
      active
        ? css`
            ${progressAnimation} ${timer}ms forwards linear
          `
        : "unset"};
  }
`;
const contentAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(3rem);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;
const ContentStyled = styled.div`
  margin-top: 1.5rem;
  @media (min-width: 768px) {
    margin-top: 2rem;
    opacity: 0;
    pointer-events: ${({ active }) => (active ? "unset" : "none")};
    animation: ${({ active }) =>
      active
        ? css`
            ${contentAnimation} 850ms 0.2s forwards cubic-bezier(0.4, 0, 0.2, 1)
          `
        : "unset"};
  }
`;
const ContentInfoStyled = styled.div`
  font-family: "Inter", sans-serif;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin: 0.5rem 0 2rem 0;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.2px;
`;
const DateStyled = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  color: var(--grey);
  text-transform: uppercase;
  @media (min-width: 1280px) {
    font-size: 1.3rem;
  }
`;
const DirectorStyled = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  color: var(--gold);
  text-align: right;
  @media (min-width: 1280px) {
    font-size: 1.3rem;
  }
`;
const HeadingStyled = styled.h1`
  font-family: var(--le);
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-size: 2.4rem;
  color: var(--black);
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  @media (min-width: 1280px) {
    font-size: 3.2rem;
    margin-bottom: 2rem;
  }
`;
const TextStyled = styled.p`
  font-family: var(--le);
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 1.4;
`;
