import React from "react";
import { usePagination, DOTS } from "../../libs/pagination";
import Arrow from "../../../public/svg/Arrow.svg";
import AllPostsButton from "./AllPostsButton";

export default function AllPostsPaginationUI({
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  fetchMore,
}) {
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
    <div className="posts-pagination posts-cards--button center">
      <button
        disabled={currentPage === 1}
        className="posts-pagination--previous"
        onClick={() => fetchMore(-1)}
      >
        <Arrow />
      </button>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <div className="posts-pagination--dots" key={pageNumber + i}>
              &#8230;
            </div>
          );
        }
        return (
          <AllPostsButton
            onClickHandler={() => fetchMore(undefined, pageNumber)}
            className={`posts-pagination--numbers ${
              pageNumber === currentPage ? "button--light" : ""
            }`}
            key={pageNumber}
            page={pageNumber}
          />
        );
      })}
      <button
        disabled={currentPage === lastPage}
        className="posts-pagination--next"
        onClick={() => fetchMore(+1)}
      >
        <Arrow />
      </button>
    </div>
  );
}
