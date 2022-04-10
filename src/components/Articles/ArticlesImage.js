import Image from "next/image";
import { imageUrlBuilder } from "../../libs/imageUrlBuilder";
import styled from "styled-components";

export default function ArticlesImage({ imageUrl }) {
  return (
    <StyledImage>
      <Image
        src={imageUrlBuilder(imageUrl)}
        alt="Director"
        width={750}
        height={410}
        unoptimized
      />
    </StyledImage>
  );
}
const StyledImage = styled.div`
  /* width: calc(100% + 6.4rem);
  margin-left: -3.2rem; */
  cursor: pointer;
  @media (min-width: 768px) {
    width: unset;
    margin-left: 0;
  }
  @media (min-width: 1280px) {
    flex: 1 1 50%;
  }
`;
