import { supabase } from '../../util/supabaseClient'
import axios from 'axios';

const unique_click = async (props) => {
    let res
    let rd
    let {
        short_code,
        ip,
        os,
        browser,
        os_version,
        is_mobile,
        is_desktop 
    } = props

    res = await supabase
    .from('unique_click')
    .select(`*`)
    .eq("short_code", short_code)   
    .eq("ip", ip)   
    .eq("os", os)   
    .eq("browser", browser)   
    .eq("os_version", os_version) 
    .eq("is_desktop", is_desktop)   
    .eq("is_mobile", is_mobile)  

    rd=res.data ? res.data[0] : {}

    if(rd && rd.id){
        rd.views++
        res = await supabase
        .from('unique_click')
        .update([{views:rd.views}]) 
        .eq("id", rd.id)   
    }else{
         res = await supabase
        .from('unique_click')
        .insert([{short_code, ip, os, browser, os_version, is_mobile, is_desktop, views:1}])    
    }
    
}
const update_click = async ({id, collab_id, short_code, clicks}) => {
    
    let unique = await supabase
    .from('unique_click')
    .select(`*`, { count: 'exact' }) 
    .eq("short_code", short_code)
    let count=unique.count  ? unique.count  : 0

    let res = await supabase
    .from('collab_short_url')
    .update([{clicks:count}]) 
    .eq("id", id)  

    let collab = await supabase
    .from('collab')
    .select(`performance_id`) 
    .eq("id", collab_id)

    let cd= collab.data ? collab.data[0] : {}
    if( cd && cd.performance_id){
        let res = await supabase
        .from('collab_performance')
        .update([{click_through:count}]) 
        .eq("id", cd.performance_id)   
    }      
}
const add_click = async ({id, collab_id, clicks}) => {
    clicks++
    let res = await supabase
    .from('collab_short_url')
    .update([{clicks}]) 
    .eq("id", id)  

    let collab = await supabase
    .from('collab')
    .select(`performance_id`) 
    .eq("id", collab_id)

    let cd= collab.data ? collab.data[0] : {}
    if( cd && cd.performance_id){
        let res = await supabase
        .from('collab_performance')
        .update([{click_through:clicks}]) 
        .eq("id", cd.performance_id)   
    }      
}
export default async function  process(props) {  
    let {action, short_code} = props
    let data={}  
    console.log("data props "+action, props)  
    if(action=='get'){  
        let res = await supabase
        .from('collab_short_url')
        .select(`*`) 
        .eq("short_code", short_code)
        //console.log("data res "+action, res)  
        data=res.data ? res.data[0] : {}
        if(data && data.id) {
            await unique_click(props)
           // await add_click(data) 
            await update_click(data)    
        }   
    }

    console.log("data res "+action, data)  
    return data
}
