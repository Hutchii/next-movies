import Link from "next/link";
import styled from "styled-components";

export default function NavbarLink({
  linkName,
  linkHref,
  children,
  onClickHandler,
  dropdown,
  footerLink,
}) {
  return (
    <Item>
      <Link href={linkHref} passHref>
        {dropdown ? (
          <HrefDropdown onClick={onClickHandler}>
            {linkName || children}
          </HrefDropdown>
        ) : (
          <Href footerLink={footerLink} onClick={onClickHandler}>
            {linkName || children}
          </Href>
        )}
      </Link>
    </Item>
  );
}

const Item = styled.li``;
const Href = styled.a`
  font-family: var(--le);
  color: var(--lightgrey);
  font-size: ${({ footerLink }) => (footerLink ? "2rem" : "2.8rem")};
  transition: color 250ms cubic-bezier(0.1, 0, 0.1, 1);
  font-weight: 300;
  &:hover {
    color: var(--gold);
  }
  @media (min-width: 768px) {
    color: ${({ footerLink }) =>
      footerLink ? "var(--lightgrey)" : "var(--black)"};
    font-size: ${({ footerLink }) => (footerLink ? "2rem" : "2.2rem")};
  }
`;
const HrefDropdown = styled(Href)`
  font: 500 1.8rem var(--grey);
  color: var(--grey);
  @media (min-width: 768px) {
    color: var(--black);
    display: block;
    white-space: nowrap;
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid #e6e6e6;
    font-size: 2rem;
    font-family: var(--le);
    font-weight: 300;
  }
`;
