import Arrow from "../../../public/svg/Arrow.svg";
import { useState } from "react";
import NavbarLink from "./NavbarLink";

export default function NavbarDropdown({
  dropdownName,
  dropdownLinks,
  onClickHamburgerHandler,
}) {
  const [showDropdown, setShowDropdown] = useState(null);
  return (
    <li
      className={`navbar-dropdown--link ${
        showDropdown ? "navbar-dropdown--list-active" : ""
      }`}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      onKeyDown={({ key }) => key === "ENTER" && setShowDropdown(true)}
    >
      <button href="/">{dropdownName}</button>
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
