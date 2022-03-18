import { gql } from "@apollo/client";

export const FEATURED_MOVIES = gql`
  query FeaturedMovies {
    movies(
      pagination: { start: 0, limit: 8 }
      sort: ["featured.id:desc", "createdAt:desc"]
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

export const DIRECTOR = gql`
  query Director {
    directors(filters: { is_featured: { eq: true } }) {
      data {
        id
        attributes {
          director
          slug
          is_featured
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

export const MOVIES_FILTERS = gql`
  query MoviesFilters(
    $start: Int!
    $limit: Int!
    $genre: String!
    $title: String!
  ) {
    movies(
      pagination: { start: $start, limit: $limit }
      sort: "createdAt:desc"
      filters: {
        genres: { title: { eq: $genre } }
        title: { contains: $title }
      }
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
          genres {
            data {
              attributes {
                title
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
