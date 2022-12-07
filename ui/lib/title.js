import s from './title.module.scss';
const com = ({children, type, to, click, size}) => {
  let _c=s.main
  if(size=="xl") _c+=' '+s.xl
  else if(size=="lg") _c+=' '+s.lg
  else if(size=="md") _c+=' '+s.md
  else if(size=="sm") _c+=' '+s.sm
  return (
    <div className={_c}>
      {children}
    </div>
  )  
}
export default com
