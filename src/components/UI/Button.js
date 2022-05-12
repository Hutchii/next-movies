import styled, { css } from "styled-components";
import Link from "next/link";

export default function UIButton({
  buttonName,
  mode,
  buttonHref,
  onClickHandler,
  children
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
        <Button onClick={onClickHandler} mode={mode} type="button">
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
  font-family: var(--inter);
  text-transform: uppercase;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  padding: 1rem 2rem;
  font-weight: 600;
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
