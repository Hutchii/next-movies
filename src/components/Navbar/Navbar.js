import { useState, useEffect } from "react";
import NavbarLink from "./NavbarLink";
import Logo from "../../../public/svg/Logo.svg";
import Hamburger from "hamburger-react";

export default function Navbar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1025px)");
    if (mq.matches) {
      if (hamburgerOpen) document.body.classList.add("navbar-overlay--overflow");
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
        className={`spacer spacer-navbar ${
          hamburgerOpen === true && "navbar-overlay-content--active"
        } ${hamburgerOpen === false && "navbar-overlay-content--inactive"}`}
      >
        <nav className="navbar-nav">
          <Logo className="navbar-logo" />
          <Hamburger
            className="navbar-hamburger"
            toggled={hamburgerOpen}
            toggle={setHamburgerOpen}
          />
          <ul className="navbar-list">
            <NavbarLink linkName="Home" linkHref="/" />
            <NavbarLink linkName="All Posts" linkHref="/" />
            <NavbarLink linkName="Directors" linkHref="/" />
            <NavbarLink linkName="About" linkHref="/" />
          </ul>
        </nav>
      </header>
    </>
  );
}
