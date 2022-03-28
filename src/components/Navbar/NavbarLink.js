import Link from "next/link";

export default function NavbarLink({
  linkName,
  linkHref,
  children,
  onClickHamburgerHandler,
}) {
  return (
    <li onClick={onClickHamburgerHandler}>
      <Link href={linkHref}>
        <a>{linkName || children}</a>
      </Link>
    </li>
  );
}
