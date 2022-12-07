import { supabase } from '../../util/supabaseClient'
import getTresholds from '../get/tresholds'
//import getInfluencer from '../get/influencer'
//import getBusiness from '../get/business'
//import getProduct from '../get/product'
import _ from 'lodash';

//import { google } from 'googleapis';
//import { getData } from '../../libs/sheets';


export default async function  process({business_id, status}, env) { 
  let out={}
  /*let args={
    spreadsheetId: env.SPREADSHEET_ID,
    range: 'fasty', // sheet name
  }
  let data = await getData(args, env)*/
  //console.log("data", data)    

   
  let query = supabase
  .from('collab')
  .select(`
  *,
  business(*),
  influencer2(*),
  product(*),
  collab_performance:performance_id(*)
  `)
  .eq('business_id', business_id)
  .neq('status', 'business_rejected')
  .order('created_at', { ascending: true })

  if (status=="others")  { query = query.neq('status', 'requested') }

  let collabs = await query
  let items=collabs.data
  let tresholds=await getTresholds(items)
  console.log("tresholds", tresholds)

  out={items, tresholds}
  /*
  let data4=_.map(collabs.data, function(collab){
    console.log("collab", collab)
    let match= _.filter(data, function(i) {  
          console.log("i "+collab.id, i[0])        
          return i[0]==collab.id ? true : false;
        }
    );
    console.log("match", match)
    if(match && match[0]) collab.match=match[0][2]
    return collab
  })

  console.log("data4", data4)
  */

  
  //data[0]=await getInfluencer(data[0])
  //data[0]=await getBusiness(data[0])
 /* const response = await getSheet.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'fasty', // sheet name
  });*/
  
  /*const rows = response.data.values;

  let filtered_array = _.filter(
      rows, function(row) {
        return row[0]==3;
      }
  );
    

  console.log("Labels", rows[0])
  console.log("filtered", filtered_array)*/  

 /* var results = await Promise.all(collabs.data.map(async (item) => {
      await getBusiness(item);
      await getInfluencer(item);
      await getProduct(item)
      return item;
  }));*/

  //let data2=collabs.data
 // let data2=collabs2
  //let data2=collabs.data  
  //let data2=data4
  //console.log("collabs_api", out)
  return out
}
