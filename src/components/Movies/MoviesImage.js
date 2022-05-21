import Image from "next/image";
import { imageUrlBuilder } from "../../utils/imageUrlBuilder";

export default function MoviesImage({ image, index }) {
  return (
    <Image
      src={imageUrlBuilder(image)}
      alt="Movie"
      width={1024}
      height={600}
      quality={86}
      priority={index === 1 || index === 2 || index === 3}
    />
  );
}
