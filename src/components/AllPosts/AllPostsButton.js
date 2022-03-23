export default function AllPostsButton({
  onClickHandler,
  areMoreMovies,
  className,
  page,
}) {
  return (
    <button
      className={`button button--dark ${className ? className : ""}`}
      onClick={onClickHandler}
      disabled={areMoreMovies}
    >
      {page ? page : "load more"}
    </button>
  );
}
