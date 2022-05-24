import { dateConverter } from "../../utils/dateConverter";
import ButtonSlider from "../UI/ButtonSlider";
import { useState, useEffect } from "react";
import { directorsFormatter } from "../../utils/directorsFormatter";
import styled, { keyframes, css } from "styled-components";
import TitleImage from "./TitleImage";

const timer = 15000;

export default function Title({ data, children }) {
  const [whichSlide, setWhichSlide] = useState(0);
  const maxSlides = data.length - 1;

  const nextSlide = () =>
    setWhichSlide((prevValue) => (prevValue === maxSlides ? 0 : prevValue + 1));
  const prevSlide = () =>
    setWhichSlide((prevValue) => (prevValue === 0 ? maxSlides : prevValue - 1));

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (maxSlides < 1 || mq.matches) return;
    const interval = setInterval(() => nextSlide(), timer);
    return () => clearInterval(interval);
  }, [whichSlide, maxSlides]);

  return (
    <main className="spacer center">
      <WrapperStyled>
        <SliderStyled>
          {data.map((movie, i) => {
            const isActive = i === whichSlide;
            return (
              <SlideStyled key={movie.id} active={isActive}>
                <ImageWrapperStyled active={isActive}>
                  <TitleImage
                    imageUrl={movie.attributes.image.data.attributes.url}
                    link={`/movies/${movie.attributes.slug}`}
                    index={i}
                  />
                  <PaginationStyled>
                    {data.map((dot, i) => {
                      const isActive = i === whichSlide;
                      return (
                        <div key={dot.id}>
                          <PaginationDotStyled
                            active={isActive}
                            onClick={() => setWhichSlide(i)}
                          >
                            {i + 1}
                          </PaginationDotStyled>
                          <PaginationProgressStyled active={isActive} />
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
    width: 100%;
  }
`;
const PaginationDotStyled = styled.p`
  @media (min-width: 768px) {
    font: 600 1.4rem var(--inter);
    color: ${({ active }) => (active ? "var(--white)" : "var(--grey)")};
    transition: color 350ms cubic-bezier(0.2, 0, 0.2, 1);
    cursor: pointer;
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
  @media (min-width: 768px) {
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
  font: 600 1.2rem "Inter", sans-serif;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin: 0.5rem 0 2rem 0;
  white-space: nowrap;
  letter-spacing: 0.1px;
  @media (min-width: 1280px) {
    font-size: 1.3rem;
  }
`;
const DateStyled = styled.p`
  color: var(--grey);
  text-transform: uppercase;
`;
const DirectorStyled = styled.p`
  color: var(--gold);
  text-align: right;
`;
const HeadingStyled = styled.h1`
  font: 300 2.6rem var(--le);
  margin-bottom: 1.5rem;
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
  font: 300 1.8rem/1.45 var(--le);
  letter-spacing: 0.2px;
  color: #2b2b2b;
`;
