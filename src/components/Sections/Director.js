import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import ButtonLink from "../UI/ButtonLink";

export default function Director({ directorData }) {
  console.log(directorData);
  return (
    <section className="director margin--top">
      <div className="director-image">
        <Image
          src={imageUrlBuilder(
            directorData[0].attributes.image.data.attributes.url
          )}
          alt="Movie"
          width={960}
          height={600}
          priority
          unoptimized
        />
      </div>
      <div className="director-text">
        <p className="paragraph--18 color--darkwhite">Discover movies by</p>
        <h2 className="heading--42 color--darkwhite">{directorData[0].attributes.director}</h2>
        <ButtonLink linkHref={`/${directorData[0].attributes.slug}`} linkName="DISCOVER" />
      </div>
    </section>
  );
}
