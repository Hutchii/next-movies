import { dateConverter } from "../../libs/dateConverter";
import ButtonArrow from "../UI/SliderButton";
import { useState, useEffect } from "react";
import { directorsFormatter } from "../../libs/directorsFormatter";
import styled, { keyframes, css } from "styled-components";
import TitleImage from "./TitleImage";

const timer = 15000;

export default function Title({ featuredMoviesData, children, fetchLink }) {
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
    }, timer);
    return () => clearInterval(interval);
  }, [whichSlide]);

  return (
    <main className="spacer">
      <StyledWrapper>
        <StyledSlider>
          {featuredMoviesData.map((movie, i) => {
            return (
              <StyledSlide key={movie.id} active={i === whichSlide}>
                <StyledImageWrapper active={i === whichSlide}>
                  <TitleImage
                    imageUrl={movie.attributes.image.data.attributes.url}
                    link={`/${fetchLink}/${movie.attributes.slug}`}
                    index={i}
                  />
                  <StyledPagination>
                    {featuredMoviesData.map((dot, i) => {
                      return (
                        <div key={dot.id}>
                          <StyledPaginationDot
                            active={i === whichSlide}
                            onClick={() => setWhichSlide(i)}
                          >
                            {i + 1}
                          </StyledPaginationDot>
                          <StyledPaginationProgress active={i === whichSlide} />
                        </div>
                      );
                    })}
                  </StyledPagination>
                  <ButtonArrow onClickHandler={prevSlide} prev />
                  <ButtonArrow onClickHandler={nextSlide} />
                </StyledImageWrapper>
                <StyledContent active={i === whichSlide}>
                  <StyledContentInfo>
                    <StyledContentDate>
                      {dateConverter(movie.attributes.createdAt)}
                    </StyledContentDate>
                    <StyledContentDirector>
                      {`By ${directorsFormatter(
                        movie.attributes.directors.data
                      )}`}
                    </StyledContentDirector>
                  </StyledContentInfo>
                  <StyledContentHeading>
                    {movie.attributes.title}
                  </StyledContentHeading>
                  <StyledContentText>
                    {movie.attributes.description}
                  </StyledContentText>
                </StyledContent>
              </StyledSlide>
            );
          })}
        </StyledSlider>
        {children}
      </StyledWrapper>
    </main>
  );
}

const StyledWrapper = styled.div`
  margin-top: 3.5rem;
  @media (min-width: 768px) {
    margin-top: 5rem;
  }
  @media (min-width: 1024px) {
    display: flex;
    gap: 5rem;
  }
  @media (min-width: 1280px) {
    gap: 6rem;
    margin-top: 8rem;
  }
  @media (min-width: 1440px) {
    gap: 8rem;
  }
`;
const StyledSlider = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template: 1fr / 1fr;
    z-index: 10;
  }
  @media (min-width: 1024px) {
    flex: 1 1 70%;
  }
`;
const StyledSlide = styled.div`
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
const StyledImageWrapper = styled.div`
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
const StyledPagination = styled.div`
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
const StyledPaginationDot = styled.div`
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
const StyledPaginationProgress = styled.div`
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
const StyledContent = styled.div`
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
const StyledContentInfo = styled.div`
  font-family: var(--inter);
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin: 0.5rem 0 2rem 0;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.2px;
`;
const StyledContentDate = styled.p`
  font-size: 1.2rem;
  color: var(--grey);
  text-transform: uppercase;
  @media (min-width: 1280px) {
    font-size: 1.3rem;
  }
`;
const StyledContentDirector = styled.p`
  font-size: 1.2rem;
  color: var(--gold);
  text-align: right;
  @media (min-width: 1280px) {
    font-size: 1.3rem;
  }
`;
const StyledContentHeading = styled.h1`
  font-family: var(--le);
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-size: 2.6rem;
  color: var(--black);
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
  @media (min-width: 1280px) {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }
`;
const StyledContentText = styled.p`
  font-family: var(--le);
  font-size: 1.8rem;
  font-weight: 300;
  letter-spacing: 0.2px;
  line-height: 1.4;
`;
