import LogoImage from "../../../public/svg/Logo.svg";
import Link from "next/link";

export default function Logo({ className }) {
  return (
    <Link href="/">
      <a className={className}>
        <LogoImage />
      </a>
    </Link>
  );
}
