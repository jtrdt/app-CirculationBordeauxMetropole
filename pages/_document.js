import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='fr'>
        <Head>
          <meta charSet='utf-8' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          {/* <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          /> */}
          <link
            href='https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href='favicon.png' />
        </Head>
        <body className='text-black'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
