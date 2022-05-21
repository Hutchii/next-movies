import Image from "next/image";
import { imageUrlBuilder } from "../../utils/imageUrlBuilder";
import styled from "styled-components";

export default function DirectorImage({ imageUrl }) {
  return (
    <ImageWrapperStyled>
      <Image
        src={imageUrlBuilder(imageUrl)}
        alt="Director"
        width={960}
        height={540}
        quality={90}
        layout="responsive"
        objectFit="cover"
      />
    </ImageWrapperStyled>
  );
}

const ImageWrapperStyled = styled.div`
  @media (min-width: 900px) {
    flex: 1 1 50%;
  }
`;
