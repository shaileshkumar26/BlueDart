import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import { wishlistReducer } from "./reducers/wishlistReducer.js";
import { uiReducer } from "./reducers/uiReducer.js";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  ui: uiReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;