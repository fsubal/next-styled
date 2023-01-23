# @fsubal/next-styled

Easy utility to use styled-components along with Next.js

### Why?

When you use styled-components with Next.js, you need to write the `Document.getInitialProps` boilerplate.

```tsx
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // VERY VERY LONG SO BORING BOILERPLATE
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
```

### How to use

```
npm install @fsubal/next-styled
```

write how to use

```tsx
import { withStyled } from '@fsubal/next-styled';

export default withStyled(function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
});
```

### Development

how to develop or contribute

### See also

some packages to refer
