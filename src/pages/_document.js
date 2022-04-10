import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="stylesheet" href="https://use.typekit.net/erq2dah.css" /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap"
            rel="stylesheet"
          /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Cabin:wght@500&family=Cormorant+Infant:wght@600;700&family=Lora&display=swap"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:wght@600;700&family=Inter:wght@500;600&family=Lora:wght@400&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://use.typekit.net/erq2dah.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
