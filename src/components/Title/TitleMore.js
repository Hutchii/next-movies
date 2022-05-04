import { dateConverter } from "../../libs/dateConverter";
import Button from "../UI/Button";
import Link from "next/link";
import styled from "styled-components";
import TitleMoreImage from "./TitleMoreImage";

export default function TitleMore({ moreMoviesData }) {
  return (
    <WrapperStyled>
      <TitleStyled>
        More <StyledTitleItalic>movies</StyledTitleItalic>
      </TitleStyled>
      <ContainerStyled>
        {moreMoviesData.map((movie) => {
          return (
            <Link key={movie.id} href={`/${movie.attributes.slug}`} passHref>
              <LinkStyled>
                <TitleMoreImage
                  imageUrl={movie.attributes.image.data.attributes.url}
                />
                <ContentStyled>
                  <DateStyled>
                    {dateConverter(movie.attributes.createdAt)}
                  </DateStyled>
                  <HeadingStyled>{movie.attributes.title}</HeadingStyled>
                </ContentStyled>
              </LinkStyled>
            </Link>
          );
        })}
        <Button buttonName="view all" buttonHref="/" />
      </ContainerStyled>
    </WrapperStyled>
  );
}

const WrapperStyled = styled.div`
  @media (min-width: 1024px) {
    flex: 1 1 30%;
  }
`;
const TitleStyled = styled.h2`
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
const ContainerStyled = styled.div`
  a {
    margin-top: 2rem;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    column-gap: 4rem;
    row-gap: 2.4rem;
    a {
      margin-top: 0rem;
    }
  }
  @media (min-width: 1024px) {
    display: block;
    a {
      margin-top: 2.6rem;
    }
  }
`;
const LinkStyled = styled.a`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  & + & {
    margin-top: 2.4rem;
  }
  @media (min-width: 768px) {
    flex: 1 1 45%;
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
const ContentStyled = styled.div`
  flex: 1 1 60%;
`;
const DateStyled = styled.p`
  font-size: 1.1rem;
  font-family: var(--inter);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--grey);
  letter-spacing: 0.2px;
`;
const HeadingStyled = styled.h2`
  color: var(--black);
  font-size: 1.8rem;
  font-family: var(--le);
  font-weight: 300;
  transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1);
`;
