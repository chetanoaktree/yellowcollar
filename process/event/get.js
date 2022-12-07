export default function process({id, isNew, from, to}) {
  let data={
    {id: 345221, parent_id:345220, source:'twitter', action:'click', target:'shop_page', datetime:'20-02-2021 20:20', gap:0 },
    {id: 345222, parent_id:345221, source:'twitter', action:'click', target:'product', target_id:'234' datetime:'20-02-2021 20:30', gap:30 },
    {id: 345223, parent_id:345222, source:'twitter', action:'click', target:'buynow', target_id:'234' datetime:'20-02-2021 20:60', gap:30 },
  }
  return data
}
