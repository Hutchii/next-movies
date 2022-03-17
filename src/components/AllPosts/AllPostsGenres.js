const listedGenres = ["all", "drama", "romance", "war", "thriller"];

export default function AllPostGenres({
  onClickHandler,
  onClickStateHandler,
  activeGenre,
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
