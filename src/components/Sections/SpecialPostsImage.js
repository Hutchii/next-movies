import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";

export default function SpecialPostsImage({ image }) {
  return (
    <div className="special-post--image">
      <Image
        src={imageUrlBuilder(image)}
        alt="Movie"
        width={1024}
        height={600}
        unoptimized
      />
    </div>
  );
}
