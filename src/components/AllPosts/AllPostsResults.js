export default function AllPostsResults({ moviesDataTotal }) {
  return (
    <p className="text--14 posts-results">
      {moviesDataTotal} <span className="color--grey">results</span>
    </p>
  );
}
