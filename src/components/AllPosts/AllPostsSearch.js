import Search from "../../../public/svg/Search.svg";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function AllPostsSearch({ refHandler, onChangeHandler }) {
  const { query } = useRouter();

  return (
    <SearchStyled>
      <InputStyled
        ref={refHandler}
        type="text"
        placeholder={`search ${
          query.genre && query.genre !== "all" ? `in #${query.genre}` : ""
        }`}
        onChange={onChangeHandler}
      />
      <IconStyled>
        <Search />
      </IconStyled>
    </SearchStyled>
  );
}

const SearchStyled = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
  @media (min-width: 480px) {
    display: inline-flex;
  }
  @media (min-width: 900px) {
    margin-top: 0;
  }
`;
const InputStyled = styled.input`
  background-color: var(--black);
  border: 1px solid var(--darkwhite);
  padding: 1rem 4rem 1rem 1.5rem;
  color: var(--darkwhite);
  border: none;
  outline: none;
  font: 600 1.3rem var(--inter);
  width: 100%;
  ::placeholder {
    font: 600 1.3rem var(--inter);
    color: var(--darkwhite);
    text-transform: uppercase;
  }
  @media (min-width: 480px) {
    width: 28rem;
  }
`;
const IconStyled = styled.div`
  fill: var(--white);
  margin: 0.4rem 0 0 -3rem;
`;
