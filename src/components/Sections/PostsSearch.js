import Search from "../../../public/svg/Search.svg";

export default function PostsSearch() {
  return (
    <div className="posts-search">
      <input type="text" placeholder="Search" />
      <div className="posts-search-icon">
        <Search />
      </div>
    </div>
  );
}
