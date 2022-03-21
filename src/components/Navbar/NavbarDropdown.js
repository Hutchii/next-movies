import Arrow from "../../../public/svg/Arrow.svg";
import Link from "next/link";
import { useState } from "react";
import NavbarLink from "./NavbarLink";

export default function NavbarDropdown({ dropdownName, dropdownLinks }) {
  const [showDropdown, setShowDropdown] = useState();
  return (
    <li
      className="navbar-dropdown--link"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <p>{dropdownName}</p>
      <Arrow />
      <ul
        className={`navbar-dropdown--list ${
          showDropdown ? "navbar-dropdown--list-active" : ""
        }`}
      >
        {dropdownLinks.map((link, i) => {
          return (
            <NavbarLink
              key={link + i}
              linkHref={link.link}
              linkName={link.name}
            />
          );
        })}
      </ul>
    </li>
  );
}
