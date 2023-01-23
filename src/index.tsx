import React from "react";
import { DocumentContext, DocumentProps } from "next/document";
import { ServerStyleSheet } from "styled-components";
import hoistNonReactStatics from "hoist-non-react-statics";
import { NextComponentType } from "next";

/**
 * Make Next.js `<Document>` work with styled-components for server-side rendering
 *
 * @example
 * ```
 * export default withStyled(function Document() {
 *   return (
 *     <Html lang="ja">
 *       <Head />
 *       <body>
 *         <Main />
 *         <NextScript />
 *       </body>
 *     </Html>
 *   );
 * });
 * ```
 */
export function withStyled<P extends DocumentProps>(
  Component: NextComponentType<DocumentContext, unknown, DocumentProps>
) {
  const EnhancedDocument = (props: P) => {
    return <Component {...props} />;
  };

  hoistNonReactStatics(EnhancedDocument, Component);

  EnhancedDocument.getInitialProps = async (ctx: DocumentContext) => {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await ctx.defaultGetInitialProps(ctx);
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
  };

  return EnhancedDocument;
}
