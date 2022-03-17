export default function AllPostsButton({onClickHandler, areMorePosts}) {
  return (
    <div className="posts-cards--button center">
      <button
        className="button button--dark"
        onClick={onClickHandler}
        disabled={areMorePosts}
      >
        load more
      </button>
    </div>
  );
}
