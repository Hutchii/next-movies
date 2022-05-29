import { gql } from "@apollo/client";

export const HOME = gql`
  query FeaturedMovies {
    movies(
      pagination: { start: 0, limit: 8 }
      sort: ["featured.id:desc", "createdAt:desc"]
    ) {
      data {
        id
        attributes {
          titless
          description
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
        }
      }
    }
    directors(
      pagination: { start: 0, limit: 1 }
      filters: { is_featured: { eq: true } }
    ) {
      data {
        id
        attributes {
          director
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    articles {
      data {
        id
        attributes {
          title
          createdAt
          description
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;


export const MOVIES = gql`
  query MoviesFilters {
    movies(
      sort: "createdAt:desc"
      pagination: { start: 0, limit: 100 }
      ) 
      {
      data {
        id
        attributes {
          title
          description
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
`;

export const MOVIES_SLUG = gql`
  query Slug {
    movies {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;

export const MOVIES_ALL = gql`
  query SlugData($slug: String!, $publicationState: PublicationState!) {
    movies(
      filters: { slug: { eq: $slug } }
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
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
`;

export const MOVIES_PREVIEW = gql`
  query SlugData($slug: String!) {
    movies(filters: { slug: { eq: $slug } }, publicationState: PREVIEW) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;

export const ARTICLES_SLUG = gql`
  query ArticlesSlug {
    articles {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;

export const ARTICLES_ALL = gql`
  query ArticlesAll($slug: String!, $publicationState: PublicationState!) {
    articles(
      filters: { slug: { eq: $slug } }
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
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
        }
      }
    }
  }
`;

export const ARTICLES_PREVIEW = gql`
  query SlugData($slug: String!) {
    articles(filters: { slug: { eq: $slug } }, publicationState: PREVIEW) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
