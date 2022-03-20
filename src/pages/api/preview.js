import { gql } from "@apollo/client";
import { initializeApollo } from "../../libs/apolloClient";

const prev = async (req, res) => {
  if (req.query.secret !== (process.env.PREVIEW_SECRET || !req.query.slug)) {
    return res.status(401).json({ message: "Invalid token" });
  }

  async function getPostBySlug(slug) {
    const apolloClientPreview = initializeApollo();
    const { data } = await apolloClientPreview.query({
      query: gql`
        query BlogSlug($slug: String!) {
          blogs(
            where: { slug: $slug }
            locale: "all"
            publicationState: PREVIEW
          ) {
            slug
            id
            title
            content
            date
            category
            image {
              url
            }
          }
        }
      `,
      variables: { slug: slug },
    });
    return data.blogs[0];
  }
  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const post = await getPostBySlug(req.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Invalid slug", post });
  }
  res.setPreviewData({});
  // Enable Preview Mode by setting the cookies
  // res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.writeHead(307, { Location: `/blog/${post.slug}` })
  // res.end();
  res.redirect(`/blog/${post.slug}`);
};

export default prev;
