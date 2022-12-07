// can connect to internal APIs or External APIs
// process function
// general params : id, offset, limit, getExtra, date_range, price_range, isVerified, isPublished, onDate, status
// always return object or object with items array, 

interface Params{
  id:integer,
  status?:string,
  onDate?:string,
} 
export default function process({id}:Params) {
  let data={  
    status:'published',
    onDate:'23-03-2022',
    items:[
      {id:12, date:'23-03-2022'},
      {id:13, date:'23-03-2022'}
    ]  
  }
  return data
}

