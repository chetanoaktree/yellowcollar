import axios from 'axios';

const getCategories = async (i) => {
  const categories = await axios.post(process.env.API+'/api/business/inventory/action', {action:'get_categories', ...i })
  //console.log('categories_data', categories.data)     
  return categories.data
} 

const getCategoriesOptions = async (i) => {
  let categories=await getCategories(i)
  let categoryOptions=[]
  if(categories){
    categoryOptions=categories.map((i, index)=>{
      return {value:i.id, label:i.name}
    })
  }
  return categoryOptions
} 



export{
  getCategories,
  getCategoriesOptions
}

