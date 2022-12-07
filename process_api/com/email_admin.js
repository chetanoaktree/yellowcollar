import {send_email} from './email'
import {order_status_change, feedback as feedback2, feedback_a, onboarding_approved,  onboarding_rejected} from './email_admin_template'

const from_email='Yellow Collar" <no-reply@yellowcollar.club>'

const send_order_status_change = async (props) => {
    let {item_id, order_id, influencer, business, order_item} =props
    let data={
        order_id,
        item_id,
        status: order_item.status,
        influencer_name: influencer.name
    }
    let html = order_status_change({data, test:false})
    let info = {
        from: from_email, // sender address
        to: influencer.email, // list of receivers,
        bcc: 'createbox-1@yahoo.co.in', // list of receivers
        subject: "Order Status Changed", // Subject line
        text: "Order Status Changed", // plain text body
        html: html, // html body
    };  
    let send=await send_email({info}) 
    return send
}

const send_feedback = async (props) => {
    let {user_name, user_email} = props
    let data={
        user_email,
        user_name       
    }
    let html = feedback2({data, test:false})
    let info = {
        from: from_email, // sender address
        to: user_email, // list of receivers,
        bcc: 'createbox-1@yahoo.co.in', // list of receivers
        subject: "Your experience at Yellow Collar.", // Subject line
        text: "Your experience at Yellow Collar.", // plain text body
        html: html, // html body
    };  
    let send=await send_email({info}) 
    return send
}
const send_feedback_a = async (props) => {
    let {user_id, user_name, user_email, feedback, experience, membership_plan} = props
    let data={
        user_id,
        user_email,
        user_name,
        feedback,
        experience,
        membership_plan
    }
    let html = feedback_a({data, test:false})
    let info = {
        from: from_email, // sender address
        to: user_email, // list of receivers,
        bcc: 'createbox-1@yahoo.co.in', // list of receivers
        subject: "Your experience at Yellow Collar.", // Subject line
        text: "Your experience at Yellow Collar.", // plain text body
        html: html, // html body
    };  
    let send=await send_email({info}) 
    return send
}
const onboarding = async (props) => {
    let {user_id, user_name, user_type, user_email, status} = props
    let data={
        user_id,
        user_email,
        user_name,  
        user_type,        
    }
    let html 
    if(status=='approved'){
        html = onboarding_approved({data, test:false})
    }else{
        html = onboarding_rejected({data, test:false})
    }
    
    let info = {
        from: from_email, // sender address
        to: user_email, // list of receivers,
        bcc: 'createbox-1@yahoo.co.in', // list of receivers
        subject: "Yellow Collar Onboarding.", // Subject line
        text: "Yellow Collar Onboarding.", // plain text body
        html: html, // html body
    };  
    let send=await send_email({info}) 
    return send
}

export {
    send_order_status_change,
    send_feedback,
    send_feedback_a,
    onboarding
}
