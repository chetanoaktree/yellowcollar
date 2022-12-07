import React, { useState, useEffect } from 'react';
import Script from 'next/script';

let ga=process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

class GA extends React.Component {
  /*componentDidMount () {
    // Include the Crisp code here, without the <script></script> tags
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "7f7b96d2-b37f-4343-8d9e-31c230c97895";

    (function() {
      var d = document;
      var s = d.createElement("script");

      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }*/

  render () {
    
    return (
      <>
        <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />

        <Script strategy="lazyOnload">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga}', {
                page_path: window.location.pathname,
                });
            `}
        </Script>
      </>
    );
  }
}
export default GA