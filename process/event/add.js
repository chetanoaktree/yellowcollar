export default function process({id, parent_id, action, source, content}) {
  let data={
    stats:{
      code:200,
      text:'successfully stored'
    },
    id:id,      
  }
  return data
}
