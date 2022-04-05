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
      meta {
        pagination {
          total
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

export const MOVIES_FILTERS_PAGINATION = gql`
  query MoviesFilters(
    $page: Int!
    $pageSize: Int!
    $genre: String!
    $title: String!
  ) {
    movies(
      pagination: { page: $page, pageSize: $pageSize }
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
      meta {
        pagination {
          total
          page
          pageSize
        }
      }
    }
  }
`;

export const SLUG = gql`
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

export const SLUG_DATA = gql`
  query SlugData($slug: String!, $publicationState: PublicationState!) {
    movies(
      filters: { slug: { eq: $slug } }
      publicationState: $publicationState
    ) {
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
`;

export const PREVIEW = gql`
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
