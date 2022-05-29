import NavbarLink from "../Navbar/NavbarLink";
import NavbarLogo from "../Navbar/NavbarLogo";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterStyled className="mtb">
      <WrapperStyled className="spacer center">
        <UpperStyled>
          <Logo />
          <LinksStyled>
            <NavbarLink linkName="Home" linkHref="/" footerLink />
            <NavbarLink linkName="Movies" linkHref="/movies" footerLink />
            <NavbarLink linkName="Contact" linkHref="/contact" footerLink />
          </LinksStyled>
        </UpperStyled>
        <CopyrightStyled>
          Copyright © 2022 Sebastian Blaik. All Rights Reserved.
        </CopyrightStyled>
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
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled(NavbarLogo)`
  svg {
    width: 6.4rem;
    height: 6.4rem;
    fill: var(--lightgrey);
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
  font: 600 1.4rem var(--inter);
  color: var(--grey);
  margin-top: 4rem;
`;
