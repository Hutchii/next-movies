import Link from "next/link";
import styled from "styled-components";

export default function NavbarLink({
  linkName,
  linkHref,
  children,
  onClickHandler,
  dropdown,
}) {
  return (
    <Item dropdown={dropdown}>
      <Link href={linkHref} passHref>
        {dropdown ? (
          <HrefDropdown onClick={onClickHandler}>
            {linkName || children}
          </HrefDropdown>
        ) : (
          <Href onClick={onClickHandler}>{linkName || children}</Href>
        )}
      </Link>
    </Item>
  );
}

const Item = styled.li`
  & + & {
    margin-top: ${({ dropdown }) => (dropdown ? "2rem" : "0")};
  }
  @media (min-width: 768px) {
    & + & {
      margin-top: 0;
    }
  }
`;
const Href = styled.a`
  font-family: var(--le);
  color: var(--white);
  font-size: 2.8rem;
  transition: color 250ms cubic-bezier(0.1, 0, 0.1, 1);
  font-weight: 300;
  &:hover {
    color: var(--gold);
  }
  @media (min-width: 768px) {
    color: var(--black);
    font-size: 2.2rem;
  }
`;
const HrefDropdown = styled(Href)`
  font-family: var(--inter);
  color: var(--grey);
  font-size: 1.8rem;
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
