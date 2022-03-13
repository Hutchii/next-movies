export default function PostGenres({
  onClickHandler,
  genreName,
  onClickStateHandler,
  activeGenre,
}) {
  return (
    <button
      className={`button button--dark ${
        activeGenre === genreName ? "button--active" : ""
      }`}
      onClick={() => {
        onClickHandler();
        onClickStateHandler(genreName);
      }}
    >
      {genreName}
    </button>
  );
}
