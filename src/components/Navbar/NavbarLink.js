import Link from "next/link";

export default function NavbarLink({ linkName, linkHref }) {
  return (
    <li>
      <Link href={linkHref}>
        <a>{linkName}</a>
      </Link>
    </li>
  );
}
