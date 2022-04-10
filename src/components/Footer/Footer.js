import Logo from "../Navbar/NavbarLogo";
import NavbarLink from "../Navbar/NavbarLink";

export default function Footer() {
  return (
    <footer className="margin--top">
      <div className="footer-nav spacer">
        <div className="footer-home">
          <Logo className="footer-logo" />
        </div>
        <nav>
          <ul className="footer-list">
            <p>Informations</p>
            <NavbarLink linkName="Home" linkHref="/" />
          </ul>
          <ul className="footer-list">
            <p>Server Side Rendering</p>
            <NavbarLink linkName="Load More" linkHref="/ssr/load-more" />
            <NavbarLink linkName="Pagination" linkHref="/ssr/pagination" />
            <NavbarLink
              linkName="Infinite Scrolling"
              linkHref="/ssr/infinite-scrolling"
            />
          </ul>
          <ul className="footer-list">
            <p>Static Generation</p>
            <NavbarLink linkName="Load More" linkHref="/ssr/load-more" />
            <NavbarLink linkName="Pagination" linkHref="/ssr/pagination" />
          </ul>
        </nav>
        <p className="footer-copyright">© Sebastian Blaik 2022</p>
      </div>
    </footer>
  );
}
