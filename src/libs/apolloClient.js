import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;
const cache = new InMemoryCache({
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       movies: relayStylePagination(),
  //     },
  //   },
  // },
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       movies: {
  //         read(asd, { args, toReference }) {
  //           console.log("ARGS:", asd);
  //           return toReference({
  //             __typename: "FeaturedMovies",
  //             id: args.id,
  //           });
  //         },
  //       },
  //     },
  //   },
  // },
});
//Create new instance of Apollo Client
function createApolloClient() {
  return new ApolloClient({
    //When using Apollo Client for server-side rendering, set this to true so that the getDataFromTree function can work effectively
    ssrMode: typeof window === "undefined",
    //HttpLink is a terminating link that sends a GraphQL operation to a remote endpoint over HTTP
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API,
      // credentials: "same-origin",
    }),
    //typePolicies for cursor pagination:
    cache: cache,
    connectToDevTools: true,

    //new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       movies: relayStylePagination(),
    //     },
    //   },
    // },
    //}),
  });
}
//Initialize Apollo Client, it takes existing apollo cache, and with cache that was passed in as pageProps it merges this two together and sets that as the final cache
export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    //Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // console.log("existingcache", existingCache);
    //Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      //Combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    // console.log("1.1-INITIALIZE");
    //Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // console.log("1");
  //For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  //Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

//Takes Apollo Client and calls cache.extract to pull out the cache and adds it to pageProps to the current pages being rendered
export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  // console.log("2", pageProps.props[APOLLO_STATE_PROP_NAME]);
  return pageProps;
}

//Pulls out the Apollo cache data stored in pageProps and uses that to initialize Apollo
export function useApollo(pageProps) {
  // console.log("3");
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
