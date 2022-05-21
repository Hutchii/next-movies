import styled from "styled-components";
import Image from "next/image";
import { imageUrlBuilder } from "../../utils/imageUrlBuilder";

export default function PostImage({ image }) {
  return (
    <ImageStyled>
      <Image
        src={imageUrlBuilder(image)}
        alt="Movie"
        width={900}
        height={526}
        quality={90}
        priority
      />
    </ImageStyled>
  );
}

const ImageStyled = styled.div`
  width: calc(100% + 6.4rem);
  margin-left: -3.2rem;
  @media (min-width: 768px) {
    width: unset;
    margin-left: 0;
  }
`;
