export default function Message({ activeGenre, empty }) {
  const emptyMessage = (
    <p>
      Unfortunately there are no{" "}
      <span className="message-highlight">{activeGenre} </span>movies.
    </p>
  );
  const searchMessage = (
    <p>Unfortunately there are no movies that match your search.</p>
  );
  const errorMessage = (
    <p>There was an error, please refresh the page and try again!</p>
  );
  return <div className="message">{empty ? emptyMessage : errorMessage}</div>;
}
