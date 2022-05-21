import LogoImage from "../../../public/svg/Logo.svg";
import Link from "next/link";

export default function NavbarLogo({ className }) {
  return (
    <Link href="/" passHref>
      <a aria-label="Home page" className={className}>
        <LogoImage />
      </a>
    </Link>
  );
}
