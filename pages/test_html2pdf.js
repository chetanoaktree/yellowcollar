import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Input from '../ui/lib/input';
import Button from '../ui/lib/button';

import Html2Pdf  from '../components/util/html2pdf';

//import html2pdf from 'html2pdf.js';


//import { Preview, print } from 'react-html2pdf';
//import template from './template.html';
/*
const HTML2PDF = () => {
    let template = (
      <div id="capture" style="padding: 10px; background: #f5da55">
          <h4 style="color: #000; ">Hello world!</h4>
      </div>
    )
    return (
      <div>
          <Preview id={'html-template'} html={template}/>
          <button onClick={()=>print('a', 'html-template')}> print</button>
          <Preview id={'jsx-template'} >
              <p>adsf</p>
          </Preview>
          <button onClick={()=>print('a', 'jsx-template')}> print</button>
      </div>
    )
}*/

function Home(props) {  
  //console.log("VIEW test", props)
  useEffect(()=>{
    //alert(1);
    if (typeof window !== "undefined") {
      var element = document.getElementById('element-to-print');
      var opt = {
        margin:       1,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // New Promise-based usage:
      html2pdf().set(opt).from(element).save();
      /*console.log("element", element)*/
    }
  }, [])
  return (
    <div>
      <Head>
        <title>Platovice Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <div style={{paddingTop:'100px'}} id="element-to-print">123</div>
      <Html2Pdf/>
    </div>
  )
}
export default Home