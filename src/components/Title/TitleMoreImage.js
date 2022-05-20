import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";

export default function TitleMoreImage({ imageUrl }) {
  return (
    <div className="title-home--image">
      <Image
        src={imageUrlBuilder(imageUrl)}
        alt="Movie"
        width={170}
        height={100}
        priority
        quality={90}
      />
    </div>
  );
}
