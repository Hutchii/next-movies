import LogoImage from "../../../public/svg/Logo.svg";
import Link from "next/link";

export default function Logo({ className }) {
  return (
    <Link href="/">
      <a>
        <LogoImage className={className} />
      </a>
    </Link>
  );
}
