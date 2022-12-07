import React, { useState, useEffect } from 'react';
class Tawk extends React.Component {
  componentDidMount () {
    // Include the Crisp code here, without the <script></script> tags
    //window.$crisp = [];
    //window.CRISP_WEBSITE_ID = "7f7b96d2-b37f-4343-8d9e-31c230c97895";
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();

    (function() {
      var d = document;
      var s = d.createElement("script");

      s.src = "https://embed.tawk.to/630b744d37898912e965b070/1gbibskvc";
      s.async = 1;
      s.charset = 'UTF-8';
      s.setAttribute('crossorigin','*');
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }

  render () {
    return null;
  }
}
export default Tawk

/*

<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/630b744d37898912e965b070/1gbibskvc';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
*/