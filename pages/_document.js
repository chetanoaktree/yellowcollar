import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
          <link rel="shortcut icon" href="/favicon.png" />
          <link href="https://fonts.googleapis.com/css2?family=Abel&family=Abhaya+Libre:wght@400;500;600;700;800;900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"></link>
          
        </Head>
        <body>
          <Main />
          <NextScript /> 
        </body>
      </Html>
    )
  }
}

export default MyDocument