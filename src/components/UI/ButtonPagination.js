import styled, { css } from "styled-components";

export default function ButtonPagination({
  mode,
  onClickHandler,
  isDisabled,
  active,
  buttonName,
  children,
  next
}) {
  return (
    <Button
      onClick={onClickHandler}
      disabled={isDisabled}
      active={active}
      mode={mode}
      next={next}
    >
      {buttonName}
      {children}
    </Button>
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
  /* padding: 1rem 2rem; */
  width: 4rem;
  height: 4rem;
  display: inline-block;
  ${({ mode }) => {
    switch (mode) {
      case "arrow":
        return css`
          background-color: transparent;
          fill: var(--black);
          border: 1px solid var(--black);
          transform: ${({next}) => next ? "rotate(180deg)" : "unset"};
          &:hover {
            background-color: var(--black);
            fill: var(--darkwhite);
          }
          svg {
            margin-top: 0.3rem;
          }
          &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }
        `;
      default:
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
    }
  }}
`;
