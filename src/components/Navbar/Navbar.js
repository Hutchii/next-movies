import { useState, useEffect } from "react";
import NavbarLink from "./NavbarLink";
import Hamburger from "hamburger-react";
import Logo from "../UI/Logo";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(null);

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
      <div
        className={`navbar-overlay ${
          hamburgerOpen ? "navbar-overlay--active" : ""
        }`}
      ></div>
      <header
        className={`spacer ${
          hamburgerOpen
            ? "navbar-overlay-content--active"
            : "navbar-overlay-content--inactive"
        }`}
      >
        <nav className="navbar-nav">
          <Logo className="navbar-logo" />
          <Hamburger
            className="navbar-hamburger"
            toggled={hamburgerOpen}
            toggle={setHamburgerOpen}
          />
          <ul className="navbar-list">
            <NavbarLink
              linkName="Home"
              linkHref="/"
              onClickHamburgerHandler={() => setHamburgerOpen(false)}
            />
            <NavbarDropdown
              dropdownName="SSR"
              dropdownLinks={[
                { name: "Load More", link: "/ssr/load-more" },
                { name: "Pagination", link: "/ssr/pagination" },
                { name: "Infinite Scrolling", link: "/ssr/infinite-scrolling" },
              ]}
              onClickHamburgerHandler={() => setHamburgerOpen(false)}
            />
            <NavbarDropdown
              dropdownName="SG"
              dropdownLinks={[
                { name: "Load More", link: "/ssg/load-more" },
                { name: "Pagination", link: "/ssg/pagination" },
              ]}
              onClickHamburgerHandler={() => setHamburgerOpen(false)}
            />

            <NavbarLink
              linkName="About"
              linkHref="/"
              onClickHamburgerHandler={() => setHamburgerOpen(false)}
            />
          </ul>
        </nav>
      </header>
    </>
  );
}
