import { initializeApollo } from "../../utils/apolloClient";
import { MOVIES_PREVIEW, ARTICLES_PREVIEW } from "../../utils/apolloQueries";

const prev = async (req, res) => {
  if (req.query.secret !== (process.env.PREVIEW || !req.query.slug)) {
    return res.status(401).json({ message: `Invalid token ${req.query.slug}` });
  }
  const slug = req.query.slug;
  const type = req.query.type;
  async function getPostBySlug(slug) {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: type === "movies" ? MOVIES_PREVIEW : ARTICLES_PREVIEW,
      variables: { slug: slug },
    });
    return data;
  }
  const post = await getPostBySlug(slug);
  if (!post || post[type].data.length === 0) {
    return res.status(401).json({ message: "Invalid slug" });
  }
  res.setPreviewData({});
  res.redirect(`/${type}/${post[type].data[0].attributes.slug}`);
};

export default prev;
