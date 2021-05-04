import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='fr'>
        {/* The <Head /> component used here is not the same one from next/head. 
        The <Head /> component used here should only be used for any <head> code that is common for all pages. 
        For all other cases, such as <title> tags, we recommend using next/head in your pages or components. */}
        <Head>
          <title>PCBM 🤔</title>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Dosis&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body className='background-image'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
