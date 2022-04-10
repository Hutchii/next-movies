import Button from "../UI/Button";
import { DIRECTOR } from "../../libs/apolloQueries";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import DirectorImage from "./DirectorImage";

export default function Director() {
  const { loading, error, data } = useQuery(DIRECTOR, {
    variables: {
      start: 0,
      limit: 4,
      genre: "all",
      title: "",
    },
  });
  const directorData = data?.directors.data[0].attributes;
  return (
    <StyledDirector>
      {!loading && !error && (
        <>
          <DirectorImage imageUrl={directorData.image.data.attributes?.url} />
          <StyledContent>
            <StyledHeading>Discover movies by</StyledHeading>
            <StyledText>{directorData.director}</StyledText>
            <Button buttonHref="/" buttonName="DISCOVER" mode="light" />
          </StyledContent>
        </>
      )}
    </StyledDirector>
  );
}

const StyledDirector = styled.section`
  background-color: var(--black);
  margin-top: 10rem;
  @media (min-width: 900px) {
    background: none;
    display: flex;
  }
  @media (min-width: 1600px) {
    margin-top: 15rem;
  }
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 3rem;
  gap: 2.4rem;
  @media (mid-width: 768px) {
    padding: 8rem 4.2rem;
  }
  @media (min-width: 900px) {
    padding: 4.6rem;
    flex: 1 1 50%;
    background-color: var(--black);
  }
  @media (min-width: 1600px) {
    gap: 3.6rem;
  }
`;
const StyledHeading = styled.h2`
  font-family: var(--le);
  font-weight: 300;
  font-size: 1.8rem;
  color: var(--darkwhite);
`;
const StyledText = styled.p`
  font-family: var(--le);
  font-size: 4rem;
  font-weight: 500;
  color: var(--darkwhite);
  line-height: 1.4;
  @media(min-width: 1440px) {
    font-size: 4.6rem;
  }
  @media(min-width: 1600px) {
    font-size: 6.4rem;
  }
`;
