import { HANDLERS_SET, APP_SET, APP_RESET, PAGE_SET, PAGE_DATA_SET, PAGE_PROCESS_SET, PAGE_RESET, PAGE_PAYMENT_SET, PAGE_PAYMENT_RESET, PAGE_MEMBERSHIP_SET, PAGE_RECENT_PRODUCTS_ADD} from "../types";
import _ from 'lodash'

const handlers={
  coupon:'',
}
const app={
  data:{
    dashboard:{}
  },
}
const payment={
  active:false,  
  method:{},
  amount:0,
  for:'',   
  action:'',
  status:'',
  result:'',  
  meta:{}
}
const membership={
  status:'',
  plan:'',
  duration:0,
  start_date:'',
  end_date:'',
  level:0,
}
const recentProducts={
  status:'',
  items:[]
}
const isProcess={
  payment:false, 
  page:false,
}
const initialState = {
  handlers,
  isLogged: false,  
  user:{},
  app:app,
  payment:payment,
  isProcess:isProcess,
  membership:membership,
  recentProducts:recentProducts,
  data:{},
  init_redirect:false,
  user_refresh_state:1,
  session_user_loaded:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    

    case PAGE_SET:
      return {
        ...state,
        ...action.payload,
      }; 
    case HANDLERS_SET:
      return {
        ...state,
        handlers:{...state.handlers, ...action.payload},
      };     
    case APP_RESET:
      return {
        ...state,
        app:{...initialState.app},
      }; 
    case APP_SET:
      return {
        ...state,
        app:{...state.app, ...action.payload},
      }; 

    case PAGE_DATA_SET:
      return {
        ...state,
        data:action.payload,
      };    

    case PAGE_PROCESS_SET:
      return {
        ...state,
        isProcess:{...state.isProcess, ...action.payload},
      }; 

    case PAGE_RECENT_PRODUCTS_ADD:
      let rp_items=state.recentProducts.items
      let result = _.remove(rp_items, function(n) {
          if (n.id == action.payload.id) {
              return true;
          }
      });
      rp_items.push(action.payload)
      return {
        ...state,
        recentProducts:{...state.recentProducts, items:rp_items},
      }; 

    case PAGE_RESET:
      return {
        ...state,
        ...initialState,
      };

    case PAGE_PAYMENT_SET:
      return {
        ...state,
        payment:{...state.payment, ...action.payload},
      };  
    
    case PAGE_PAYMENT_RESET:
      return {
        ...state,
        payment:{...payment},
      }; 
    case PAGE_MEMBERSHIP_SET:
      //console.log("membership_page", action.payload)
      return {
        ...state,
        membership:{...state.membership, ...action.payload},
      }; 
     

     
   
    default:
      return state;
  }
};

export default reducer;
