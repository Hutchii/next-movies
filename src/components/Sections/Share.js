import Facebook from "../../../public/svg/Facebook.svg";
import Twitter from "../../../public/svg/Twitter.svg";
import Instagram from "../../../public/svg/Instagram.svg";
import ShareLink from "../Sections/ShareLink";

export default function Share() {
  return (
    <div className="title-slug--share">
      <p>Share</p>
      <div>
        <ShareLink linkHref="/">
          <Facebook />
        </ShareLink>
        <ShareLink linkHref="/">
          <Twitter />
        </ShareLink>
        <ShareLink linkHref="/">
          <Instagram />
        </ShareLink>
      </div>
    </div>
  );
}
