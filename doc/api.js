import influencer from './influencer'; 
import business from './business';
import common from './common';
import user from './user';

import influencerSchema from './schema/influencer'; 
import businessSchema from './schema/business'; 
import commonSchema from './schema/common'; 
import userSchema from './schema/user'; 


const apis = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Platovise API : Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Platovise API : Staging : Swagger'
      },
      {
        url: 'https://platovise.vercel.app/',
        description: 'Platovise API : Vercel : Swagger'
      },
      {
        url: 'http://api.platovise.com/',
        description: 'Platovise API : Production : Swagger'
      }
    ],
    tags:[        
      {
        name: 'Influencer',
        description: "influencer api description"
      },
      {
        name: 'Influencer Collaboration',
        description: "influencer Collaboration api description"
      },
      {
        name: 'Influencer Notification',
        description: "influencer Notification api description"
      },
      {
        name: 'Influencer Product',
        description: "influencer Product api description"
      },
      {
        name: 'Influencer Promotion',
        description: "influencer Promotion api description"
      },
      {
        name: 'Influencer Order',
        description: "influencer Order api description"
      },
      {
        name: 'Business', 
        description: "Business api description"
      },
      {
        name: 'Business Product',
        description: "Business Product api description"
      },
    ],        
    "components": {
      "schemas": {          
          ...influencerSchema,
          ...businessSchema,
          ...commonSchema,
          ...userSchema,
      }
    }, 
    "paths": {       
      ...influencer, 
      ...business,  
      ...common,  
      ...user,             
    },     
  },
}
export default apis;