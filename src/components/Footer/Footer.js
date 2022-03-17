import Logo from "../../../public/svg/Logo.svg";
import NavbarLink from "../Navbar/NavbarLink";

export default function Footer() {
  return (
    <footer className="margin--top">
      <div className="footer-nav spacer">
        <Logo />
        <nav>
          <ul className="footer-list">
            <NavbarLink linkName="Home" linkHref="/" />
            <NavbarLink linkName="All Posts" linkHref="/" />
            <NavbarLink linkName="Directors" linkHref="/" />
            <NavbarLink linkName="About" linkHref="/" />
          </ul>
        </nav>
      </div>
    </footer>
  );
}
