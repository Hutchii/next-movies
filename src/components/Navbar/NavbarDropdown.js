import Arrow from "../../../public/svg/Arrow.svg";
import { useState } from "react";
import NavbarLink from "./NavbarLink";

export default function NavbarDropdown({
  dropdownName,
  dropdownLinks,
  onClickHamburgerHandler,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(showDropdown);
  return (
    <li
      className={`navbar-dropdown--link ${
        showDropdown ? "navbar-dropdown--list-active" : ""
      }`}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        href="/"
        // onClick={() => setShowDropdown((prevValue) => !prevValue)}
        // aria-expanded={showDropdown ? "true" : "false"}
      >
        {dropdownName}
      </button>
      <Arrow />
      <ul className="navbar-dropdown--list">
        {dropdownLinks.map((link, i) => {
          return (
            <NavbarLink
              key={link + i}
              linkHref={link.link}
              linkName={link.name}
              onClickHamburgerHandler={() => {
                onClickHamburgerHandler();
                setShowDropdown(false);
              }}
            />
          );
        })}
      </ul>
    </li>
  );
}
