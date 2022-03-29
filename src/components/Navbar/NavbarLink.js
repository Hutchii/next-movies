import Link from "next/link";

export default function NavbarLink({
  linkName,
  linkHref,
  children,
  onClickHamburgerHandler,
}) {
  return (
    <li>
      <Link href={linkHref}>
        <a onClick={onClickHamburgerHandler}>{linkName || children}</a>
      </Link>
    </li>
  );
}
