import Logo from "../../../public/svg/Logo.svg";
import NavbarLink from "../Navbar/NavbarLink";

export default function Footer() {
  return (
    <footer className="margin--top">
      <div className="footer-nav spacer">
        <Logo />
        <nav>
          <ul className="footer-list">
            <NavbarLink linkName="SSR + Client" linkHref="/" />
            <NavbarLink linkName="SG" linkHref="/" />
            <NavbarLink linkName="Directors" linkHref="/" />
            <NavbarLink linkName="About" linkHref="/" />
          </ul>
        </nav>
        <p className="footer-copyright">© Sebastian Blaik 2022</p>
      </div>
    </footer>
  );
}
