import { combineReducers } from "redux";
import sampleReducer from "./sampleReducer";
import cartReducer from "./cartReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
  sampleData: sampleReducer,
  cartData: cartReducer,
  pageData: pageReducer,
});
