import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link rel="shortcut icon" href="/images/favicon.svg" />

          <link rel="apple-touch-icon" href="/icons/maskable_icon_x192.png" />

          <link rel="manifest" href="/manifest.json" />

          <meta name="theme-color" content="#68D391" />

          <meta name="title" content="shape.it" />

          <meta
            name="description"
            content="Salve e gerencie seus treinos com facilidade."
          />

          <meta property="og:type" content="website" />

          <meta
            property="og:url"
            content="https://shape-it-preview.vercel.app/"
          />

          <meta property="og:title" content="shape.it" />

          <meta
            property="og:description"
            content="Salve e gerencie seus treinos com facilidade."
          />

          <meta property="og:image" content="https://i.imgur.com/CLHSlkt.png" />

          <meta property="twitter:card" content="summary_large_image" />

          <meta
            property="twitter:url"
            content="https://shape-it-preview.vercel.app/"
          />

          <meta property="twitter:title" content="shape.it" />

          <meta
            property="twitter:description"
            content="Salve e gerencie seus treinos com facilidade."
          />

          <meta
            property="twitter:image"
            content="https://i.imgur.com/CLHSlkt.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
