import Search from "../../../public/svg/Search.svg";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function MoviesSearch({ refHandler, onChangeHandler }) {
  const { query } = useRouter();
  const [test, setTest] = useState({
    one: "key",
    two: "code",
    three: "keyCode",
  });
  useEffect(() => {
    const eventAction = (e) => {
      console.log(e);
      setTest({
        one: e.key,
        two: e.code,
        three: e.keyCode,
      });
      if (e.code === "Enter" || e.keyCode === 13) {
        refHandler.current.blur();
      }
    };
    refHandler.current.addEventListener("keyup", (e) => {
      eventAction(e);
    });
    return refHandler.current.removeEventListener("keyup", (e) => {
      eventAction(e);
    });
  }, [refHandler]);

  return (
    <>
      <SearchStyled>
        <InputStyled
          ref={refHandler}
          type="search"
          placeholder={`search ${
            query.genre && query.genre !== "all" ? `in #${query.genre}` : ""
          }`}
          onChange={onChangeHandler}
        />
        <Search />
      </SearchStyled>
      <p>{test.one}</p>
      <p>{test.two}</p>
      <p>{test.three}</p>
    </>
  );
}

const SearchStyled = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    position: absolute;
    left: 0;
    fill: var(--white);
    margin: 0rem 0 0 0.8rem;
  }
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
  padding: 1rem 0.5rem 1rem 4rem;
  color: var(--darkwhite);
  border: none;
  outline: none;
  font: 600 1.3rem var(--inter);
  width: 100%;
  position: relative;
  ::placeholder {
    font: 600 1.3rem var(--inter);
    color: var(--darkwhite);
    text-transform: uppercase;
  }
  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 50em;
    background: url(/svg/Cancel.svg) no-repeat;
    margin-top: 0.3rem;
    opacity: 1;
  }
  @media (min-width: 480px) {
    width: 28rem;
  }
`;
