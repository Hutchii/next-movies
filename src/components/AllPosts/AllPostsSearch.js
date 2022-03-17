import Search from "../../../public/svg/Search.svg";

export default function AllPostsSearch({ refHandler, onChangeHandler }) {
  return (
    <div className="posts-search">
      <input
        ref={refHandler}
        type="text"
        placeholder="Search"
        onChange={onChangeHandler}
      />
      <div className="posts-search-icon">
        <Search />
      </div>
    </div>
  );
}
