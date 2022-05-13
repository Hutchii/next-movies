import styled, { keyframes, css } from "styled-components";
import Success from "../../../public/svg/Success.svg";
import Error from "../../../public/svg/Error.svg";

export default function Overlay({ sendingStatus }) {
  console.log(sendingStatus)
  return (
    <OverlayStyled status={sendingStatus}>
      {sendingStatus === "success" && <Success />}
      {sendingStatus === "error" && <Error />}
      <TitleStyled>
        {sendingStatus === "success" ? "MESSAGE SENT" : "THERE WAS AN"}{" "}
        <TitleItalicStyled>
          {sendingStatus === "success" ? "SUCCESSFULLY" : "ERROR"}
        </TitleItalicStyled>
      </TitleStyled>
    </OverlayStyled>
  );
}

const showMessage = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const OverlayStyled = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.9);
  opacity: 0;
  pointer-events: none;
  ${({ status }) => {
    switch (status) {
      case "success":
        return css`
          animation: ${showMessage} 3.5s forwards
            cubic-bezier(0.215, 0.61, 0.355, 1);
        `;
      case "error":
        return css`
          animation: ${showMessage} 3.5s forwards
            cubic-bezier(0.215, 0.61, 0.355, 1);
        `;
      default:
        return css`
          animation: unset;
        `;
    }
  }}
`;
const TitleStyled = styled.h2`
  font-size: 1.5rem;
  text-transform: uppercase;
  font-family: var(--inter);
  font-weight: 600;
  color: var(--black);
  text-align: center;
  margin: 3.2rem 0 6.4rem 0;
`;
const TitleItalicStyled = styled.span`
  color: var(--gold);
  font-style: italic;
  font-weight: 500;
`;
