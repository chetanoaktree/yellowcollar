import { supabase } from '../../util/supabaseClient'
import shortid from 'shortid'
import _ from 'lodash'
import Moment from 'moment';
import Handlebars from 'handlebars';

import {
  get_invoice
} from '../_model/m_invoice'

var html_to_pdf = require('html-pdf-node');

const get_style = () => {
  let style=`
  <style> 
    .main{font-size:12px; line-height:1.5}
    h2{margin-bottom:10px;}
    h4{font-size:16px; font-weight:bold; margin-bottom:10px;}
    .header{padding:50px; display:flex; border-bottom:1px solid rgba(0,0,0,0.1);}
      .h_left{width:50%; display:flex; flex-direction:column; padding-right:20px;}
      .h_right{width:50%; display:flex; flex-direction:column; padding-left:20px; text-align:right; align-items:flex-end;}
      .logo{width:200px;}
      .logo img{width:100%; height:auto;}
      .yc{margin-bottom:30px; max-width:250px;}
      .to{margin-bottom:30px; max-width:250px;}
      .by{margin-bottom:30px; max-width:250px;}
    .content{padding:0px 50px 50px 50px; display:flex; flex-wrap:wrap; }
    .invoice_title{padding:10px 50px; margin-bottom:30px;}
    .left{width:30%;}
    .right{flex-grow:1;}
    .bg{ color:red; }
    .invoice{margin-bottom:20px;}
    .type{margin-bottom:20px;}
    .items_head{display:flex; align-items:center; padding:10px 0px; border-bottom:2px solid rgba(0,0,0,1); }
    .last_item{margin-bottom:40px;}
    .item{display:flex;  align-items:center; border-bottom:1px solid rgba(0,0,0,1); padding:10px 0px;}
      .item > div {}
      .i_desc{flex-grow:1; padding-right:6px;}
      .i_price{width:10%; text-align:center; padding:0px 6px;}
      .i_discount{width:15%; text-align:center; padding:0px 6px;}
      .i_f_price{width:15%; text-align:center; padding:0px 6px;}
      .i_qty{width:10%; text-align:center; padding:0px 6px;}
      .i_sub_total{width:15%; text-align:right;  padding-left:6px;}
    .pricing{border-top:2px solid rgba(0,0,0,1); }
      .total{display:flex; font-weight:bold; font-size:14px; }
      .line{ border-bottom:1px solid rgba(0,0,0,1); padding:6px 0px; }
      .line ._label{flex-grow:1;}
      .line ._value{}
    .note{padding:6px 0px; }
    .footer{position:fixed; bottom:0px; left:0px; right:0px;  padding:10px 50px;}
      .f_inner{border-top:1px solid rgba(0,0,0,1);  padding:6px 0px; display:flex; }
      .f_left{flex-grow:1;}
      .f_right{}
  </style>`
  return style
}

const get_items = (items) => {
  let ret =`<div class='items_head'><div class='i_desc'>Description</div><div class='i_price'>Price</div><div class='i_discount'>Discount</div><div class='i_f_price'>Final Price</div><div class='i_qty'>Qty</div><div class='i_sub_total'>Sub Total</div></div>`
  _.forEach(items, (i, k)=>{
    let {id, desc, qty, discount, price, f_price, sub_total} = i 
    let r=`<div class='item'><div class='i_desc'>${desc}</div><div class='i_price'>Rs. ${price}</div><div class='i_discount'>Rs. ${discount}</div><div class='i_f_price'>Rs. ${f_price}</div><div class='i_qty'>${qty}</div><div class='i_sub_total'>Rs. ${sub_total}</div></div>`
    ret+=r
  })
  ret+=`<div class='item last_item'>&nbsp;</div>`
  return ret
}
const get_type = (i) => {
  let {type, influencer={name:''}, business={company_name, name:''}}=i
  let ret = {to_name:'', by_name:''}
  business.company_name = business.company_name ? business.company_name : business.name

  if(type=='order'){
    ret.to_name=influencer.name
    ret.by_name= business.company_name
  }
  return ret
}
const get_html = (i) => {
  let {id, type, type_id, type_date, created_at, items, to_address, by_address, total}=i 
  type_date=Moment(type_date).format('MMM Do YYYY')
  created_at=Moment(created_at).format('MMM Do YYYY') 
  let t=get_type(i)
  let {to_name, by_name} = t ? t :{}
  let note='Price including Tax'
  let yc_adress=`5th Floor, A Wing , Raheja VIVAREA, Saane Guruji Marg, Mahalaxmi, Mumbai - 400011`
  let style=get_style()
  let items_=get_items(items)
  let yc = `<div class='yc'><h4>Yellow Collar</h4><div>${yc_adress}</div><div>GST No.  73894098834798080</div></div>`
  let to = `<div class='to'><h4>Invoice To ${to_name}</h4><div>${to_address}</div><div>GST No.  73894098834798080</div></div>`
  let by = `<div class='by'><h4>Invoice By ${by_name}</h4><div>${by_address}</div><div>GST No.  73894098834798080</div></div>`
  let logo = `<div class='logo'><img src="https://yellowcollar.club//Logo.svg"></div>`
  let invoice_ = `<div class='invoice'><div>Invoice No</div><div>#${id}</div></div>`
  let membership_ = `<div class='type'><div>${type} No.:<br> #${type_id}</div><br><div>${type} Date:<br> ${type_date}</div></div>`  
  let sub_total_=`<div class='sub_total line'><div class='_label'>Total</div><div class='_value'>Rs.123</div></div>` 
  let total_=`<div class='total line'><div class='_label'>Total</div><div class='_value'>Rs. ${total}</div></div>` 
  let tax_=`<div class='tax line'><div class='_label'>Total</div><div class='_value'>Rs. 123</div></div>` 
  let pricing_=`<div class='pricing'>${total_}</div>` 
  let note_= note ? `<div class='note'><div>Note</div><div>${note}</div></div>` : ''
  let html=`
    <div class='main'>
      <div class='header'>
        <div class='h_left'>${to}${by}</div>
        <div class='h_right'>${yc}${logo}</div>
      </div>
      <div class="invoice_title"><h2 >Invoice</h2><div>${created_at}</div></div>
      <div class='content'>      
        <div class='left'>${invoice_}${membership_}</div>
        <div class='right'>${items_}${pricing_}${note_}</div>
      </div>
      <div class='footer'>
        <div class='f_inner'>
          <div class='f_left'>Yellow Collar</div>
          <div class='f_right'>info@yellowcollar.com</div>
        </div>
      </div>
    </div>
  `
  
  let ret=style+html
  return ret
}
//localhost:3000/api/download_invoice_2?id=33
const get_style2 = () => {
  let style=`
  <style> 
    *, *:before, *:after {box-sizing: inherit;}
    .main_holder{width:100%; position:relative; padding:20px;} 
    .main{font-family: sans-serif; idth:97%; position:relative;  font-size:12px; line-height:18px;}    
    h2{margin-bottom:10px;}
    h4{font-size:16px; font-weight:bold;}
    .header{position:relative; width:100%; border-bottom:1px solid rgba(0,0,0,0.1); padding:20px 0px 60px 0px;}
      .h_left{width:50%; }
      .h_right{width:50%; vertical-align:middle; text-align:right;}
      .logo{max-width:150px; position:relative; padding-top:20px;}
      .logo img{height:auto;}
      .yc{margin-bottom:30px; max-width:250px;}
      .to{margin-bottom:30px; max-width:250px; line-height:1.2;}
      .heading{font-size:14px; font-weight:bold;}
      .by{margin-bottom:30px; max-width:250px;}
    .content{width:100%; }
    .invoice_title{padding:10px 0px;}
    .left{width:30%;}
    .right{width:70%; }
    .bg{ color:red; }
    .invoice{margin-bottom:20px;}
    .type{margin-bottom:20px;}
    .items_head{width:100%;  align-items:center; padding:10px 0px; border-bottom:2px solid rgba(0,0,0,1); }
    .last_item{margin-bottom:40px;}
    .item{width:100%; align-items:center; border-bottom:1px solid rgba(0,0,0,1); padding:10px 0px;}
      .item > div {}
      .i_desc{width:35%; padding-right:6px;}
      .i_price{width:10%; text-align:center; padding:0px 6px;}
      .i_discount{width:15%; text-align:center; padding:0px 6px;}
      .i_f_price{width:15%; text-align:center; padding:0px 6px;}
      .i_qty{width:10%; text-align:center; padding:0px 6px;}
      .i_sub_total{width:15%; text-align:right;  padding-left:6px;}
    .pricing{width:100%;border-top:2px solid rgba(0,0,0,1); }
      .total{width:100%; font-weight:bold; font-size:14px; }
      .line{ border-bottom:1px solid rgba(0,0,0,1); padding:6px 0px; }
      .line ._label{width:50%;}
      .line ._value{width:50%; text-align:right;}
    .note{padding:6px 0px; }
    .footer{ width:100%; margin-top:100px;}
      .f_inner{width:100%; border-top:1px solid rgba(0,0,0,1);  padding:6px 0px; }
      .f_left{width:30%;}
      .f_right{width:70%; text-align:right;}
  </style>`
  return style
}

const get_items2 = (items) => {
  let ret =`
  <table class='items_head'>
    <tr>
      <td class='i_desc'>Description</td>
      <td class='i_price'>Price</td>
      <td class='i_discount'>Discount</td>
      <td class='i_f_price'>Final Price</td>
      <td class='i_qty'>Qty</td>
      <td class='i_sub_total'>Sub Total</td>
    </tr>
  </table>`
  _.forEach(items, (i, k)=>{
    let {id, desc, qty, discount, price, f_price, sub_total} = i 
    let r=`
    <table class='item'>
      <tr>
        <td class='i_desc'>${desc}</td>
        <td class='i_price'>Rs. ${price}</td>
        <td class='i_discount'>Rs. ${discount}</td>
        <td class='i_f_price'>Rs. ${f_price}</td>
        <td class='i_qty'>${qty}</td>
        <td class='i_sub_total'>Rs. ${sub_total}</td>
      </tr>
    </table>`
    ret+=r
  })
  ret+=`<table class='item last_item'><tr><td>&nbsp;<td></tr></table>`
  return ret
}
const get_html2 = (i) => {  
   let {id, type, type_id, type_date, created_at, items, to_address, by_address, total}=i 
  type_date=Moment(type_date).format('MMM Do YYYY')
  created_at=Moment(created_at).format('MMM Do YYYY') 
  let t=get_type(i)
  let {to_name, by_name} = t ? t :{}
  let note='Price including Tax'
  let yc_adress=`5th Floor, A Wing , Raheja VIVAREA, Saane Guruji Marg, Mahalaxmi, Mumbai - 400011`
  let style=get_style2()
  let items_=get_items2(items)
  let yc = `<div class='yc'><h4>Yellow Collar</h4><br><div>${yc_adress}</div><div>GST No.  73894098834798080</div></div>`
  let to = `<div class='to'><div class='heading'>Invoice To ${to_name}</div><br><div>${to_address}</div><div>GST No.  73894098834798080</div></div>`
  let by = `<div class='by'><div class='heading'>Invoice By ${by_name}</div><br><div>${by_address}</div><div>GST No.  73894098834798080</div></div>`
  let logo = `<div class='logo'><img src="Logo.png"></div>`
  let invoice_ = `<div class='invoice'><div>Invoice No</div><div>#${id}</div></div>`
  let membership_ = `<div class='type'><div>${type} No.:<br> #${type_id}</div><br><div>${type} Date:<br> ${type_date}</div></div>`  
  let sub_total_=`<div class='sub_total line'><div class='_label'>Total</div><div class='_value'>Rs.123</div></div>` 
  let total_=`
  <table class='total line'>
    <tr>
      <td class='_label'>Total</td>
      <td class='_value'>Rs. ${total}</td>
    </tr>
  </table>` 
  let tax_=`<div class='tax line'><div class='_label'>Total</div><div class='_value'>Rs. 123</div></div>` 
  let pricing_=`<div class='pricing'>${total_}</div>` 
  let note_= note ? `<table class='note2'><tr><td>Note</td></tr><tr><td>${note}</td></tr></table>` : ''
  let html=`
  <html lang="en-US">
  <html>
      <head>
          <title>HTML View</title>
      </head>
      <body style="padding: 10px; font-size: 10pt;">
      <div class='main_holder' >
        <div class='main' >        
          <table class='header'>
            <tr>
              <td class='h_left'>${to}<br/><br/>${by}</td>
              <td class='h_right'>${yc}<br/>${logo}</td>
            </tr>
          </table>           
          <div class="invoice_title"><h2 >Invoice</h2><div>${created_at}</div></div>
          <table class='content'>     
            <tr> 
              <td class='left'><br/>${invoice_}<br/>${membership_}</td>
              <td class='right'>${items_}${pricing_}${note_}</td>
            </tr>
          </table>            
        </div>
      </div>
      </body>
  </html>
  `
  
  let ret=style+html  
  return ret
}
const get_footer = () => { 
  let ret=`
  <table width="100%" style="border-top:1px solid rgba(0,0,0,1); padding-top:10px;">
      <tr>
          <td width="33%">Yellow Collar</td>
          <td width="33%" align="center"></td>
          <td width="33%" style="text-align: right;">info@yellowcollar.com</td>
      </tr>
  </table>`
  return ret
}

const generate_html = async ({id, API}) => { 
  let invoice_data=await get_invoice({id}) 
  let invoice_data2=122
  console.log("invoice data", invoice_data)
  let html=get_html(invoice_data)  
  return html
}
const generate_handlebars_html = async ({id, API}) => { 
  let invoice_data=await get_invoice({id})  
  console.log("invoice data", invoice_data)  
  let html=get_html2(invoice_data)  
  var template = Handlebars.compile(html)
  let ret=template({fasty:'fasty now'})
  return ret
}


const generate_pdf = async ({id, API}) => { 
  let invoice_data=await get_invoice({id}) 
  console.log("invoice data", invoice_data)
  let html=get_html(invoice_data)
  let invoice_page='/admin/invoice/'+id
  let filename=`invoice_${id}.pdf`
 // let file = { url: "https://www.yellowcollar.club/" };
  let file = { content: html };
  let options = { format: 'A4', path:'public/temp/'+filename };
  
  let pdf_res=await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
    console.log("PDF Buffer:-", pdfBuffer);
  });   

  console.log("pdf_res", pdf_res);

  let ret={}
  ret.url = API+'/temp/'+filename;
  ret.filename = filename
  return ret
}

export default async function  process(props) { 
  let { id, API }=props 
  let data={}  
  let query
  let res

  
  data=await generate_pdf({id, API})
  return data
}

export {
  generate_html,
  generate_handlebars_html ,
  get_footer 
}