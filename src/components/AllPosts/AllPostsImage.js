import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";

export default function AllPostsImage({ image }) {
  return (
    <div className={`posts-cards--image`}>
      {/* {isLoading && <div className="posts-placeholder--image"></div>} */}
      <Image
        src={imageUrlBuilder(image)}
        alt="Movie"
        width={1024}
        height={600}
        unoptimized
        // className={isLoading ? "isloading" : "asd"}
      />
    </div>
  );
}
