import { initializeApollo } from "../../utils/apolloClient";
import { MOVIES_PREVIEW, ARTICLES_PREVIEW } from "../../utils/apolloQueries";

const prev = async (req, res) => {
  if (req.query.secret !== ("tajne" || !req.query.slug)) {
    return res.status(401).json({ message: `Invalid token ${req.query.slug}` });
  }
  const slug = req.query.slug;
  async function getPostBySlug(slug) {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: MOVIES_PREVIEW,
      variables: { slug: slug },
    });
    return data;
  }
  const post = await getPostBySlug(slug);
  if (!post || post.movies.data.length === 0) {
    return res.status(401).json({ message: "Invalid slug" });
  }
  res.setPreviewData({});
  res.redirect(`/movies/${post.movies.data[0].attributes.slug}`);
};

export default prev;

// import { initializeApollo } from "../../utils/apolloClient";
// import { MOVIES_PREVIEW, ARTICLES_PREVIEW } from "../../utils/apolloQueries";

// const prev = async (req, res) => {
//   if (req.query.secret !== ("tajne" || !req.query.slug)) {
//     return res.status(401).json({ message: `Invalid token ${req.query.slug}` });
//   }
//   const [path, slug] = req.query.slug.split("/");
//   async function getPostBySlug(slug) {
//     const apolloClient = initializeApollo();
//     const { data } = await apolloClient.query({
//       query: path === "movies" ? MOVIES_PREVIEW : ARTICLES_PREVIEW,
//       variables: { slug: slug },
//     });
//     console.log("DATA", data);
//     return data;
//   }
//   console.log(req);
//   const post = await getPostBySlug(slug);
//   if (!post || post.movies.data.length === 0) {
//     return res.status(401).json({ message: "Invalid slug" });
//   }
//   res.setPreviewData({});
//   res.redirect(`/movies/${post.movies.data[0].attributes.slug}`);
// };

// export default prev;
