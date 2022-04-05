import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import ButtonLink from "../UI/ButtonLink";
import { DIRECTOR } from "../../libs/apolloQueries";
import { useQuery } from "@apollo/client";

export default function Director() {
  const { error, data } = useQuery(DIRECTOR, {
    variables: {
      start: 0,
      limit: 4,
      genre: "all",
      title: "",
    },
  });
  const directorData = data?.directors.data[0].attributes;
  return (
    <section className="director margin--top">
      {!error && (
        <>
          <div className="director-image">
            <Image
              src={imageUrlBuilder(directorData?.image.data.attributes.url)}
              alt="Movie"
              width={960}
              height={600}
              unoptimized
            />
          </div>
          <div className="director-text">
            <p className="paragraph--18 color--darkwhite">Discover movies by</p>
            <h2 className="heading--42 color--darkwhite">
              {directorData?.director}
            </h2>
            <ButtonLink
              linkHref={`/${directorData?.slug}`}
              linkName="DISCOVER"
            />
          </div>{" "}
        </>
      )}
    </section>
  );
}
