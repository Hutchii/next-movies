import { dateConverter } from "../../libs/dateConverter";
import Button from "../UI/Button";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import styled from "styled-components";
import TitleMoreImage from "./TitleMoreImage";

export default function TitleMore({ moreMoviesData, fetchLink }) {
  return (
    <StyledWrapper>
      <StyledTitle>
        More in <StyledTitleItalic>movies reporter</StyledTitleItalic>
      </StyledTitle>
      <StyledMore>
        {moreMoviesData.map((movie) => {
          return (
            <Link
              key={movie.id}
              href={`/${fetchLink}/${movie.attributes.slug}`}
              passHref
            >
              <StyledMoreLink>
                <TitleMoreImage
                  imageUrl={movie.attributes.image.data.attributes.url}
                />
                <StyledMoreContent>
                  <StyledMoreText>
                    {dateConverter(movie.attributes.createdAt)}
                  </StyledMoreText>
                  <StyledMoreHeading>
                    {movie.attributes.title}
                  </StyledMoreHeading>
                </StyledMoreContent>
              </StyledMoreLink>
            </Link>
          );
        })}
        <ScrollLink to="posts" smooth={true} offset={-50}>
          <Button buttonName="view all" />
        </ScrollLink>
      </StyledMore>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @media (min-width: 1024px) {
    flex: 1 1 30%;
  }
`;
const StyledTitle = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: var(--inter);
  margin: 8rem 0 2.8rem 0;
  font-weight: 600;
  color: var(--black);
  @media (min-width: 1024px) {
    margin: 0 0 4rem 0;
  }
`;
const StyledTitleItalic = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
`;
const StyledMore = styled.div`
  button {
    margin-top: 2rem;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    column-gap: 4rem;
    row-gap: 2.4rem;
    button {
      margin-top: 0rem;
    }
  }
  @media (min-width: 1024px) {
    display: block;
    button {
      margin-top: 2.6rem;
    }
  }
`;
const StyledMoreLink = styled.a`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  & + & {
    margin-top: 2.4rem;
  }
  @media (min-width: 768px) {
    flex: 1 1 45%;
    /* > img {
      transition: all 600ms cubic-bezier(0.1, 0, 0.1, 1);
    } */
    img {
      transition: all 0.5s cubic-bezier(0.2, 0, 0.2, 1);
    }
    &:hover img {
      transform: scale(1.04);
      filter: brightness(90%);
    }
    &:hover h2 {
      color: var(--gold);
    }
    & + & {
      margin-top: 0;
    }
  }
  @media (min-width: 1024px) {
    & + & {
      margin-top: 3rem;
    }
  }
`;
const StyledMoreContent = styled.div`
  flex: 1 1 60%;
`;
const StyledMoreText = styled.p`
  font-size: 1.1rem;
  font-family: var(--inter);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--grey);
  letter-spacing: 0.2px;
`;
const StyledMoreHeading = styled.h2`
  color: var(--black);
  font-size: 1.8rem;
  font-family: var(--le);
  font-weight: 300;
  transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1);
`;
