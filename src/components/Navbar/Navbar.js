import { useState, useEffect } from "react";
import NavbarLink from "./NavbarLink";
import Hamburger from "hamburger-react";
import NavbarLogo from "./NavbarLogo";
import NavbarDropdown from "./NavbarDropdown";
import styled, { keyframes, css } from "styled-components";

export default function Navbar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const setHamburgerOpenHandler = () => setHamburgerOpen(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    if (mq.matches) {
      if (hamburgerOpen)
        document.body.classList.add("navbar-overlay--overflow");
      else document.body.classList.remove("navbar-overlay--overflow");
    }
  }, [hamburgerOpen]);
  return (
    <>
      <Overlay active={hamburgerOpen} />
      <Header className="spacer">
        <Nav>
          <Logo active={hamburgerOpen} />
          <Hamburger
            toggled={hamburgerOpen}
            toggle={setHamburgerOpen}
            color={hamburgerOpen ? "var(--darkwhite)" : "var(--black)"}
          />
          <List active={hamburgerOpen}>
            <NavbarLink
              linkName="Home"
              linkHref="/"
              onClickHandler={setHamburgerOpenHandler}
            />
            <NavbarLink
              linkName="Contact"
              linkHref="/contact"
              onClickHandler={setHamburgerOpenHandler}
            />
            {/* <NavbarDropdown
              dropdownName="SSR"
              dropdownLinks={[
                { name: "Load More", link: "/ssr/load-more" },
                { name: "Pagination", link: "/ssr/pagination" },
                { name: "Infinite Scrolling", link: "/ssr/infinite-scrolling" },
              ]}
              onClickHandler={setHamburgerOpenHandler}
            />
            <NavbarDropdown
              dropdownName="SG"
              dropdownLinks={[
                { name: "Load More", link: "/ssg/load-more" },
                { name: "Pagination", link: "/ssg/pagination" },
              ]}
              onClickHandler={setHamburgerOpenHandler}
            /> */}
          </List>
        </Nav>
      </Header>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  background-color: var(--black);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  transform: ${({ active }) => (active ? "translateX(0)" : "translateX(100%)")};
  opacity: ${({ active }) => (active ? "1" : "0")};
  z-index: 100;
  transition: all 600ms cubic-bezier(0.4, 0, 0.2, 1);
  @media (min-width: 768px) {
    display: none;
  }
`;
const Header = styled.header`
  position: relative;
  z-index: 200;
  margin: 0 auto 3.5rem;
  @media (min-width: 1280px) {
    margin: 0 auto 6rem;
  }
  @media (min-width: 1440px) {
    margin: 0 auto 8rem;
  }
`;
const Nav = styled.nav`
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  @media (min-width: 768px) {
    height: 10rem;
  }
`;
const Logo = styled(NavbarLogo)`
  z-index: 200;
  width: 4rem;
  height: 4rem;
  fill: ${({ active }) => (active ? "var(--darkwhite)" : "var(--black)")};
  transition: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  @media (min-width: 768px) {
    width: 5rem;
    height: 5rem;
  }
  @media (min-width: 1600px) {
    width: 6rem;
    height: 6rem;
  }
`;
const listAnimation = keyframes`
  0% {
    transform: translateY(-2.4rem) translateX(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
`;

const List = styled.ul`
  position: fixed;
  top: 10rem;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
  z-index: 100;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  animation: ${({ active }) =>
    active
      ? css`
          ${listAnimation} 0.6s 0.35s forwards cubic-bezier(0.215, 0.61, 0.355, 1)
        `
      : "unset"};
  pointer-events: ${({ active }) => (active ? "unset" : "none")};
  @media (min-width: 768px) {
    position: unset;
    top: unset;
    left: unset;
    text-align: unset;
    transform: unset;
    opacity: 1;
    pointer-events: unset;
    display: flex;
    margin-top: 1rem;
    > li + li {
      margin-left: 4.6rem;
    }
  }
`;
