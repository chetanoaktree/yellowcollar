import _ from 'lodash'
const extract_item = (i, item={}) => {  
  let {find, get_type} = item  
  var re = new RegExp(`${find}:[\\w]+`,"g");
  //var match = i.query.match(/product_status:[\w]+/g);
  var match = i.query.match(re);
  console.log("match", match) 

  let out=false  
  if(match){
    let f=match[0].replace(`${find}:`,'').toLowerCase()
    if(get_type=="object"){
      out={label:f, value:f}  
    }else{
      out=f
    } 
  }
  return out
}

const extract_items = (i, items=[]) => {   
  const {query}=i 
  let found=false
  if(query){
     _.forEach(items, function(value, key) { 
      let get=extract_item(i, value)
      if(get) {
        found=true
        i[value.get]=get
      } else{
        i[value.get]=''
      }    
    });
    if(found!=false) i.query=''
  }
  console.log("i", i)  
  return i
}

const extract_items_dummy = (i, items=[]) => {   
  const {query}=i 
  if(query){
    let reset={query:'', product_status:'', product_name:'', product_id:''}
    let d={} 
    let f=''
    console.log("query", query)     
      
    var product_status_match = query.match(/product_status:[\w]+/g);
    var product_match = query.match(/product:[\w]+/g);
    var product_id_match = query.match(/product_id:[\w]+/g);

    console.log("product_match", product_match) 
    console.log("product_status", product_status_match) 
    console.log("product_match", product_match) 
    if( product_status_match || product_id_match || product_match) {
      i=reset
    }
    
    if( product_status_match && product_status_match[0]) {
      f=product_status_match[0].replace("product_status:",'').toLowerCase()
      i.product_status={label:f, value:f}       
    }  

    if( product_match && product_match[0]) {
      f=product_match[0].replace("product:",'').toLowerCase()
      i.product_name=f   
    }
    if( product_id_match && product_id_match[0]) {
      f=product_id_match[0].replace("product_id:",'').toLowerCase()
      i.product_id=f   
    }   
            
  }
  console.log("i", i)  
  return i
}

export{
  extract_item,
  extract_items
}
