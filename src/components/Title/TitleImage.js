import Link from "next/link";
import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import styled from "styled-components";

export default function TitleImage({ imageUrl, link, index }) {
  return (
    <Link href={link} passHref>
      <LinkSlide>
        <ImageWrapperSlide>
          <Image
            src={imageUrlBuilder(imageUrl)}
            alt="Movie"
            width={1024}
            height={600}
            priority={index === 0}
            unoptimized
            layout="responsive"
          />
        </ImageWrapperSlide>
      </LinkSlide>
    </Link>
  );
}

const LinkSlide = styled.a`
  @media (min-width: 768px) {
    img {
      transition: all 0.5s cubic-bezier(0.2, 0, 0.2, 1);
    }
    &:hover img {
      transform: scale(1.04);
      filter: brightness(80%);
    }
  }
`;
const ImageWrapperSlide = styled.div`
  width: calc(100% + 6.4rem);
  margin-left: -3.2rem;
  cursor: pointer;
  @media (min-width: 768px) {
    width: unset;
    margin-left: 0;
  }
`;
