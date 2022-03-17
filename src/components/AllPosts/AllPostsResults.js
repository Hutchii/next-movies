export default function AllPostsResults({ totalLength }) {
  return (
    <p className="text--14 posts-results">
      {totalLength} <span className="color--grey">results</span>
    </p>
  );
}
