import { useState } from "react";
import NavbarLink from "./NavbarLink";
import Logo from "../../../public/svg/Logo.svg";
import Hamburger from "hamburger-react";

export default function Navbar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <>
      <div
        className={`navbar-overlay ${
          hamburgerOpen ? "navbar-overlay--active" : ""
        }`}
      ></div>
      <header
        className={`spacer ${
          hamburgerOpen ? "navbar-overlay-content--active" : ""
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
            <NavbarLink linkName="Home" linkHref="/" />
            <NavbarLink linkName="All Posts" linkHref="/" />
            <NavbarLink linkName="Directors" linkHref="/" />
            <NavbarLink linkName="Contact" linkHref="/" />
          </ul>
        </nav>
      </header>
    </>
  );
}
