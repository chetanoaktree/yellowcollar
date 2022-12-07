import { supabase } from '../../util/supabaseClient'

const download = () => {   
  const { data, error } = await supabase.storage.from('avatars').download('public/avatar1.png')
  console.log("Downloaded Data", data)
  
  return true
}
const upload = (file) => {   
  //const avatarFile = event.target.files[0]
  const avatarFile = file
  const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar1.png', avatarFile)

  console.log("uploaded Data", data)  
  return true
}



export {
  download
}
