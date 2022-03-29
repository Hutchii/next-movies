import { gql } from "@apollo/client";
import { initializeApollo } from "../../libs/apolloClient";

const prev = async (req, res) => {
  if (req.query.secret !== ("tajne" || !req.query.slug)) {
    return res.status(401).json({ message: `Invalid token ${req.query.slug}` });
  }

  async function getPostBySlug(slug) {
    const apolloClientPreview = initializeApollo();
    const { data } = await apolloClientPreview.query({
      query: gql`
        query SlugData($slug: String!) {
          movies(filters: { slug: { eq: $slug } }, publicationState: PREVIEW) {
            data {
              id
              attributes {
                slug
                title
                content
                createdAt
                slug
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                directors {
                  data {
                    attributes {
                      director
                    }
                  }
                }
                genres {
                  data {
                    attributes {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: { slug: slug },
    });
    return data.movies.data[0].attributes;
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
  res.redirect(`/ssr/load-more/${post.slug}`);
};

export default prev;
