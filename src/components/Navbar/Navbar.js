import { useState, useEffect } from "react";
import NavbarLink from "./NavbarLink";
import Logo from "../../../public/svg/Logo.svg";
import Hamburger from "hamburger-react";

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
      />
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
            <NavbarLink linkName="SSR + Client" linkHref="/" />
            <NavbarLink linkName="SG" linkHref="/" />
            <NavbarLink linkName="Directors" linkHref="/" />
            <NavbarLink linkName="About" linkHref="/" />
          </ul>
        </nav>
      </header>
    </>
  );
}
