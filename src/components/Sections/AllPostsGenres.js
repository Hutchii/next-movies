export default function AllPostGenres({
  onClickHandler,
  onClickStateHandler,
  activeGenre,
  listedGenres
}) {
  return (
    <div className="posts-filters">
      {listedGenres.map((genre, i) => {
        return (
          <button
            key={genre + i}
            className={`button button--dark ${
              activeGenre === genre ? "button--active" : ""
            }`}
            onClick={() => {
              onClickHandler(genre);
              onClickStateHandler(genre);
            }}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
