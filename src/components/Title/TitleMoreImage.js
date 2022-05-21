import Image from "next/image";
import { imageUrlBuilder } from "../../utils/imageUrlBuilder";

export default function TitleMoreImage({ imageUrl }) {
  return (

      <Image
        src={imageUrlBuilder(imageUrl)}
        alt="Movie"
        width={170}
        height={100}
        priority
        quality={90}
      />
  );
}
