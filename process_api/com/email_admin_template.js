import {compile_template} from './handlebars'
import {template_simple} from './email_template'

const test_data = () => {
    let data = { "name": "Alan", "hometown": "Somewhere, TX",
                "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]}
    let content ="<h1>Order Status Change</h1><p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
             "{{kids.length}} kids:</p>" +
             "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>"
    return {       
        data1:data,        
        content1:content
    }
}

const order_status_change = ({data, test=false}) => {
    var content, title
    title = 'Order Status Change'
    if(test==true){
        let {data1, content1} = test_data()
        data = data1       
        content = content1
    }else{       
        content = "Hello {{influencer_name}}<br/>" + 
            "Your order item #{{item_id}} has {{status}}!<br/>" +  
            "For your order #{{order_id}}" 
    }
    var source= template_simple({title, content})    
    var result = compile_template({source, data})    
    return result

}
const feedback = ({data, test=false}) => {
    var content, title
    title = 'Your experience at Yellow Collar.'
    if(test==true){
        let {data1, content1}=test_data()
        data = data1       
        content = content1
    }else{        
        content = "Hello {{user_name}}<br/>" +   
            "Thank you so much for your feedback about about Yellow Collar. " + 
            "We really appreciate the details you shared with us about areas where we can improve. " + 
            "This insight will help us greatly."       
    }
    var source= template_simple({title, content})    
    var result = compile_template({source, data})    
    return result

}

const feedback_a = ({data, test=false}) => {
    var content, title
    title = '{{user_name}} experience at Yellow Collar.'
    if(test==true){
        let {data1, content1}=test_data()
        data = data1       
        content = content1
    }else{        
        content = "Feedback :  {{feedback}}<br/>" + 
            "Experience Rating :  {{experience}}<br/>" +    
            "User Id :  {{user_id}}<br/>" +  
            "User Email :  {{user_email}}<br/>" +  
            "Membership Plan :  {{membership_plan}}<br/>"
    }
    var source= template_simple({title, content})    
    var result = compile_template({source, data})    
    return result

}
const onboarding_approved = ({data, test=false}) => {
    let {user_type}=data
    var content, title
    title = 'Your Onboarding at Yellow Collar.'
    if(test==true){
        let {data1, content1}=test_data()
        data = data1       
        content = content1
    }else{    
        if(user_type=="business") {
            content = "Hello {{user_name}}<br/>" +   
            "CONGRATULATIONS! <br/>" + 
            "Your email has been verified. You are now a YellowCollar verified business!<br/>" + 
            "You can now connect with influencers and match with the right influencers for your brand, only at YellowCollar!<br/>" + 
            "We are here to help you enhance your influencer marketing opportunities and achieve better ROI's.😁<br/>" + 
            "What are you waiting for? Login and get matching with influencers.<br/>" + 
            "<a href='https://yellowcollar.club/auth'>Login to Yellow Collar</a>" 
        } else{
            content = "Hello {{user_name}}<br/>" +   
            "CONGRATULATIONS! <br/>" + 
            "Your email has been verified. You are now a YellowCollar verified influencer!<br/>" + 
            "You can now connect with brands and shop their products at an influencer privilege discount, only at YellowCollar!<br/>" + 
            "We are here to create opportunities for you to grow your personal brand.<br/>" + 
            "What are you waiting for? Login and get influencing.<br/>" + 
            "<a href='https://yellowcollar.club/auth'>Login to Yellow Collar</a>" 
        }
              
    }
    var source= template_simple({title, content})    
    var result = compile_template({source, data})    
    return result

}
const onboarding_rejected = ({data, test=false}) => {
    var content, title
    title = 'Your Onboarding at Yellow Collar.'
    if(test==true){
        let {data1, content1}=test_data()
        data = data1       
        content = content1
    }else{        
        content = "Hello {{user_name}}<br/>" +   
            "We're sorry! You need to have 1000 followers and your account must be public in order to be a yellow collar verified influencer.<br/>" + 
            "You'll get there soon. We are waiting for you ❤️"       
    }
    var source= template_simple({title, content})    
    var result = compile_template({source, data})    
    return result

}


export {
    order_status_change,
    feedback,
    feedback_a,
    onboarding_approved,
    onboarding_rejected,
}

/*
"Your Feedback details :<br/> " +  
"Your rating for Experience with Yellow Collar is {{experience}}!<br/> " +  
"Your feedback:<br/>" +
"{{feedback}}<br/>" +
*/

/*
welcome

reject
Onboarding rejected.
We're sorry! You need to have 1000 followers and your account must be public in order to be a yellow collar verified influencer. You'll get there soon. We are waiting for you ❤️ 

*/



