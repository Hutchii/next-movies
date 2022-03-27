import Search from "../../../public/svg/Search.svg";
import { useRouter } from "next/router";

export default function AllPostsSearch({ refHandler, onChangeHandler }) {
  const { query } = useRouter();

  return (
    <div className="posts-search">
      <input
        ref={refHandler}
        type="text"
        placeholder={`search ${
          query.genre && query.genre !== "all" ? `in #${query.genre}` : ""
        }`}
        onChange={onChangeHandler}
      />
      <div className="posts-search-icon">
        <Search />
      </div>
    </div>
  );
}
