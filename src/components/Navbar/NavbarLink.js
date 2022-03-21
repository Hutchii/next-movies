import Link from "next/link";

export default function NavbarLink({ linkName, linkHref, children }) {
  return (
    <li>
      <Link href={linkHref}>
        <a>{linkName || children}</a>
      </Link>
    </li>
  );
}
