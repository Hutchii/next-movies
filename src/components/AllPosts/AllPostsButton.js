export default function AllPostsButton({onClickHandler, areMoreMovies}) {
  return (
    <div className="posts-cards--button center">
      <button
        className="button button--dark"
        onClick={onClickHandler}
        disabled={areMoreMovies}
      >
        load more
      </button>
    </div>
  );
}
