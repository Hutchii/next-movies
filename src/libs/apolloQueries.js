import { gql } from "@apollo/client";

export const MOVIES = gql`
  query Movies {
    movies {
      data {
        id
        attributes {
          title
          content
          description
          createdAt
          slug
          release
          featured {
            data {
              id
            }
          }
          genres {
            data {
              attributes {
                title
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
      meta {
        pagination {
          total
          page
        }
      }
    }
  }
`;
export const FEATURED_MOVIES = gql`
  query FeaturedMovies {
    movies(filters: { featured: { id: { not: null } } }) {
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
          featured {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
export const MORE_MOVIES = gql`
  query FeaturedMovies {
    movies(
      filters: { featured: { id: { eq: null } } }
      pagination: { start: 0, limit: 4 }
      sort: "createdAt:desc"
    ) {
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
          featured {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
