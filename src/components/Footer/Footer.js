import Logo from "../../../public/svg/Logo.svg";
import NavbarLink from "../Navbar/NavbarLink";
import styled from "styled-components";

export default function Footer() {
  return (
    // <footer className="margin--top">
    //   <div className="footer-nav spacer">
    //     <div className="footer-home">
    //       <Logo className="footer-logo" />
    //     </div>
    //     <nav>
    //       <ul className="footer-list">
    //         <p>Informations</p>
    //         <NavbarLink linkName="Home" linkHref="/" />
    //       </ul>
    //       <ul className="footer-list">
    //         <p>Server Side Rendering</p>
    //         <NavbarLink linkName="Load More" linkHref="/ssr/load-more" />
    //         <NavbarLink linkName="Pagination" linkHref="/ssr/pagination" />
    //         <NavbarLink
    //           linkName="Infinite Scrolling"
    //           linkHref="/ssr/infinite-scrolling"
    //         />
    //       </ul>
    //       <ul className="footer-list">
    //         <p>Static Generation</p>
    //         <NavbarLink linkName="Load More" linkHref="/ssr/load-more" />
    //         <NavbarLink linkName="Pagination" linkHref="/ssr/pagination" />
    //       </ul>
    //     </nav>
    //     <p className="footer-copyright">© Sebastian Blaik 2022</p>
    //   </div>
    // </footer>
    <FooterStyled>
      <WrapperStyled className="spacer center">
        <UpperStyled>
          <Logo />
          <LinksStyled>
            <NavbarLink linkName="Home" linkHref="/" footerLink={true} />
            <NavbarLink linkName="Articles" linkHref="/" footerLink={true} />
            <NavbarLink linkName="Movies" linkHref="/" footerLink={true} />
            <NavbarLink linkName="Contact" linkHref="/" footerLink={true} />
          </LinksStyled>
        </UpperStyled>
        <CopyrightStyled>Copyright © 2022 Sebastian Blaik. All Rights Reserved.</CopyrightStyled>
      </WrapperStyled>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  background-color: var(--black);
  padding: 8rem 0 3.2rem 0;
  margin-top: 12.8rem;
`;
const WrapperStyled = styled.div``;
const UpperStyled = styled.div`
  svg {
    width: 6.4rem;
    height: 6.4rem;
    fill: var(--lightgrey);
  }
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const LinksStyled = styled.ul`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  @media (min-width: 768px) {
    gap: 6rem;
  }
`;
const CopyrightStyled = styled.p`
  color: var(--grey);
  font-size: 1.4rem;
  margin-top: 4rem;
  font-family: var(--inter);
  font-weight: 500;

`