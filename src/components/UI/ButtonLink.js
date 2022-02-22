import Link from "next/link";

export default function ButtonLink({ linkHref, linkName, dark }) {
  return (
    <Link href={linkHref}>
      <a className={`button ${dark ? "button--dark" : "button--light"}`}>
        {linkName}
      </a>
    </Link>
  );
}
