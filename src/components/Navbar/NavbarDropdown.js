import { useState } from "react";
import NavbarLink from "./NavbarLink";

export default function NavbarDropdown({
  dropdownName,
  dropdownLinks,
  onClickHamburgerHandler,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <li
      className={`navbar-dropdown--link ${
        showDropdown ? "navbar-dropdown--list-active" : ""
      }`}
      onMouseOver={() => window.innerWidth > 768 && setShowDropdown(true)}
      onMouseLeave={() => window.innerWidth > 768 && setShowDropdown(false)}
    >
      <button type="button" href="/">
        {dropdownName} <span className="navbar-dropdown--arrow" />
      </button>
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
