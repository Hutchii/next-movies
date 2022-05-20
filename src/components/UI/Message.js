import styled from "styled-components";

export default function Message({ message }) {
  return (
    <ErrorMessage>
      <p>{message}</p>
    </ErrorMessage>
  );
}

const ErrorMessage = styled.div`
    width: 100%;
  min-height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.6rem;
  text-align: center;
`