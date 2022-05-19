import styled from "styled-components";

export default function ButtonSlider({ prev, onClickHandler }) {
  return <Arrow prev={prev} onClick={onClickHandler} />;
}

const Arrow = styled.button`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 7rem;
    height: 100%;
    top: 0;
    background: none;
    border: none;
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.5s cubic-bezier(0.2, 0, 0.2, 1);
    left: ${({ prev }) => (prev ? "0" : "unset")};
    right: ${({ prev }) => (prev ? "unset" : "0")};
    padding: ${({ prev }) => (prev ? "0 0 0 1rem" : "0 1rem 0 0")};
    &:before {
      border-color: var(--white);
      border-style: solid;
      border-width: 2px 2px 0 0;
      display: block;
      height: 2.5rem;
      width: 2.5rem;
      transform: ${({ prev }) => (prev ? "rotate(-135deg)" : "rotate(45deg)")};
    }
  }
`;
