import { useState } from "react";
import NavbarLink from "./NavbarLink";
import styled from "styled-components";

export default function NavbarDropdown({
  dropdownName,
  dropdownLinks,
  onClickHandler,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Item
      // className={`navbar-dropdown--link ${
      //   showDropdown ? "navbar-dropdown--list-active" : ""
      // }`}
      onMouseOver={() => window.innerWidth > 768 && setShowDropdown(true)}
      onMouseLeave={() => window.innerWidth > 768 && setShowDropdown(false)}
    >
      <Button type="button">
        {dropdownName}
        <Arrow className="navbar-dropdown--arrow" active={showDropdown} />
      </Button>
      <List active={showDropdown}>
        {dropdownLinks.map((link, i) => {
          return (
            <NavbarLink
              dropdown={true}
              key={link + i}
              linkHref={link.link}
              linkName={link.name}
              onClickHandler={() => {
                onClickHandler();
                setShowDropdown(false);
              }}
            />
          );
        })}
      </List>
    </Item>
  );
}

const Item = styled.li`
  margin-top: 2rem;
  @media (min-width: 768px) {
    position: relative;
    cursor: pointer;
    margin-top: 0;
  }
`;
const Button = styled.button`
  background: none;
  border: none;
  font-family: var(--le);
  color: var(--white);
  margin-bottom: 2rem;
  font-size: 2.8rem;
  font-weight: 300;
  @media (min-width: 768px) {
    color: var(--black);
    font-size: 2.2rem;
    cursor: pointer;
    margin-bottom: 0;
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
  }
`;
const Arrow = styled.span`
  @media (min-width: 768px) {
    display: inline-block;
    margin-left: 0.6rem;
    border-top: 0.65rem solid;
    border-right: 0.5rem solid transparent;
    border-left: 0.5rem solid transparent;
    transition: 250ms cubic-bezier(0.1, 0, 0.1, 1);
    color: var(--black);
    cursor: pointer;
    transform: ${({ active }) => (active ? "rotate(180deg)" : "rotate(0)")};
  }
`;
const List = styled.ul`
  @media (min-width: 768px) {
    position: absolute;
    background-color: var(--white);
    left: 0;
    margin-left: -1.5rem;
    z-index: 200;
    opacity: ${({ active }) => (active ? "1" : "0")};
    border-radius: 6px;
    pointer-events: ${({ active }) => (active ? "unset" : "none")};
    border: 1px solid var(--lightgrey);
  }
`;
