import React, { useState, useEffect } from 'react';
class Html2Pdf extends React.Component {
  componentDidMount () {
    // Include the Crisp code here, without the <script></script> tags
    window.$test = [];
    window.TEST = "7f7b96d2-b37f-4343-8d9e-31c230c97895";   
    (function() {
      var d = document;
      var s = d.createElement("script");

      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);    
    })();
    
  }

  render () {
    return null;
  }
}
export default Html2Pdf