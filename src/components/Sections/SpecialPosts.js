import SpecialPostsPost from "./SpecialPostsPost";

export default function SpecialPosts({ data }) {
  return (
    <section className="spacer">
      <h2 className="text--15 margin--top header--title">
        MOST VIEWED ARTICLES IN
        <span className="color--grey text--italic"> movies reporter</span>
      </h2>
      <SpecialPostsPost data={data} />
    </section>
  );
}
