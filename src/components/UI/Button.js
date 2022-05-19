import styled, { css } from "styled-components";
import Link from "next/link";

export default function UIButton({
  buttonName,
  mode,
  buttonHref,
  onClickHandler,
  children,
  type,
  isDisabled,
  activeGenre,
}) {
  return (
    <>
      {buttonHref ? (
        <Link href={buttonHref} passHref>
          <Button mode={mode} as="a" type="button">
            {buttonName}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={onClickHandler}
          mode={mode}
          type={type ? type : "button"}
          disabled={isDisabled}
          active={activeGenre}
        >
          {buttonName}
          {children}
        </Button>
      )}
    </>
  );
}

const Button = styled.button`
  border: none;
  outline: none;
  font: 600 1.2rem var(--inter);
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  padding: 1rem 2rem;
  display: inline-block;
  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }
  ${({ mode }) => {
    switch (mode) {
      case "light":
        return css`
          background-color: transparent;
          color: var(--darkwhite);
          border: 1px solid var(--darkwhite);
          &:hover {
            background-color: var(--darkwhite);
            color: var(--black);
          }
        `;
      case "active":
        return css`
          background-color: var(--black);
          color: var(--darkwhite);
          border: 1px solid var(--black);
        `;
      case "filter":
        return css`
          background-color: ${({ active }) =>
            active ? "var(--black)" : "transparent"};
          color: ${({ active }) => (active ? "var(--lightgrey)" : "black")};
          border: 1px solid var(--black);
          &:hover {
            background-color: var(--black);
            color: var(--darkwhite);
          }
        `;
      default:
        return css`
          background-color: transparent;
          color: var(--black);
          border: 1px solid var(--black);
          &:hover {
            background-color: var(--black);
            color: var(--darkwhite);
          }
        `;
    }
  }}
`;
