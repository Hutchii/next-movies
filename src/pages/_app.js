import "../../styles/globals.css";
import Layout from "../components/UI/Layout";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apolloClient";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
