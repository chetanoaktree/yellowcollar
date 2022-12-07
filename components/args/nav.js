

const args={
  home:'/',
  influencerHome:'/',
  logoText:"platovise",  
  logoImg:"/Logo.svg",
  fullWidth:false,
  items:[],
  guestItems:[
    {label:"For Businesses", to:"/business"},
    {label:"For Influencers", to:"/influencer"}
  ],
  userItems:[
    {label:"Feedback", to:"/app/feedback"},
  ],
  newUserItems:[
    {label:"OnBoarding", to:"/onboarding"},
  ],
  influencerItems:[     
    {label:"Home", to:"/"},
    {label:"Shop", to:"/app/products"},
    {label:"Collaborations", to:"/app/collab", match:["/app/collab/[id]"]},
    {label:"Dashboard", to:"/app"},   
  ],
  businessItems:[    
    {label:"Dashboard", to:"/app"}, 
    {label:"Collaborations", to:"/app/collab", match:["/app/collab/[id]"]},   
    {label:"Sales", to:"/app/sales", match:["/app/sales/[id]"]},    
    {label:"Inventory", to:"/app/inventory", match:["/app/inventory/[id]"]},
    
  ],
  adminItems:[       
    {label:"Orders", to:"/admin/orders"},
    {label:"Collaborations", to:"/admin/collaborations"},    
    {label:"Transactions", to:"/admin/transactions"},
    {label:"Settlements", to:"/admin/settlements"}, 
  ],
  companyItems:[
    {label:'About', to:'/about'},
    {label:'Team', to:'/about#team'},
    {label:'Our Beliefs', to:'/about#believe'},
    //{label:'Careers', to:'/careers'}
  ],
  solutionsItems:[
    {label:'Businesses', to:'/businesses'},
    {label:'Influencers', to:'/influencers'}    
  ],
  platformItems:[
    {label:'Overview', to:'/platform'},    
    {label:'Features', to:'/platform#features'},
    //{label:'Demo', to:'/platform#demo'}
  ],
  resourcesItems:[        
    {label:'Blog', to:'/blog'},
    //{label:'Videos', to:'/videos'},
    {label:'FAQ', to:'/faq'},
    //{label:'Help', to:'/help'}
  ],
  policiesItems:[    
    {label:'Privacy Policy', to:'/privacy-policy'},
    {label:'Terms & Conditions', to:'/terms-conditions'}
    //{label:'Help', to:'/help'}
  ],
  actionHref:"https://forms.office.com/pages/responsepage.aspx?id=ZL06m637OUKL3qOWmfbjrFlWJL_UNG5CgeD-Wga83EZURUJJSTgwQjE3MU40VVlJRzFCOUs5WlFOMSQlQCN0PWcu",  
  isLogged: false,
}
export default args
