import Nav from '../ui/lib/nav2';
import process from './process';

const download = () => {   
  const { data, error } = await supabase.storage.from('avatars').download('public/avatar1.png')
  //console.log("guest args", args)
  return (
    <Nav {...args.navArgs}></Nav>
  )
}
export {
  download
}
