import Link from "next/link";

export default function NavbarLink({
  linkName,
  linkHref,
  children,
  onClickHandler,
}) {
  return (
    <li>
      <Link href={linkHref}>
        <a onClick={onClickHandler}>{linkName || children}</a>
      </Link>
    </li>
  );
}
