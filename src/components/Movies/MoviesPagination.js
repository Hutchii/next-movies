import { usePagination, DOTS } from "../../hooks/usePagination";
import ArrowPagination from "../../../public/svg/ArrowPagination.svg";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonPagination from "../UI/ButtonPagination";

export default function MoviesPagination({
  totalCount,
  currentPage,
  pageSize,
  fetchMore,
}) {
  const [mediaQuery, setMediaQuery] = useState(true);
  let siblingCount = mediaQuery ? 1 : 0;
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 480px)");
    if (mq.matches) setMediaQuery(false);
  }, []);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <WrapperStyled>
      <ButtonPagination
        mode="arrow"
        onClickHandler={() => fetchMore(-1)}
        isDisabled={currentPage === 1}
      >
        <ArrowPagination />
      </ButtonPagination>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <Dots key={pageNumber + i}>
              &#8230;
            </Dots>
          );
        }
        return (
          <ButtonPagination
            key={pageNumber}
            onClickHandler={() => fetchMore(undefined, pageNumber)}
            buttonName={pageNumber}
            active={pageNumber === currentPage}
          ></ButtonPagination>
        );
      })}
      <ButtonPagination
        mode="arrow"
        onClickHandler={() => fetchMore(+1)}
        isDisabled={currentPage === lastPage}
        next
      >
        <ArrowPagination />
      </ButtonPagination>
    </WrapperStyled>
  );
}

const WrapperStyled = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 5rem;
  justify-content: center;
`;
const Dots = styled.div`
  font: 600 1.2rem var(--inter);
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
