import Link from "next/link";

export default function ShareLink({ linkHref, children }) {
  return (
    <Link href={linkHref}>
      <a>{children}</a>
    </Link>
  );
}
