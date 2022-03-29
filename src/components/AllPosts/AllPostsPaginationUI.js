import { usePagination, DOTS } from "../../libs/pagination";
import ArrowPagination from "../../../public/svg/ArrowPagination.svg";
import AllPostsButton from "./AllPostsButton";
import { useEffect, useState } from "react";

export default function AllPostsPaginationUI({
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
    <div className="posts-pagination posts-cards--button center">
      <button
        disabled={currentPage === 1}
        className="posts-pagination--previous"
        onClick={() => fetchMore(-1)}
      >
        <ArrowPagination />
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
        <ArrowPagination />
      </button>
    </div>
  );
}
