import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import styled from "styled-components";

export default function DirectorImage({ imageUrl }) {
  return (
    <StyledImage>
      <Image
        src={imageUrlBuilder(imageUrl)}
        alt="Director"
        width={960}
        height={540}
        unoptimized
        layout="responsive"
        objectFit="cover"
      />
    </StyledImage>
  );
}

const StyledImage = styled.div`
  @media (min-width: 900px) {
    flex: 1 1 50%;
  }
`;
