import { CART_ADD, CART_REMOVE, CART_INC, CART_DEC, CART_CLEAR } from "../types.js";
import { saveCartToStorage } from "./storageActions.js";

export const addToCart = (product) => (dispatch, getState) => {
  dispatch({ type: CART_ADD, payload: product });
  dispatch(saveCartToStorage(getState().cart.items));
};

export const incCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_INC, payload: id });
  dispatch(saveCartToStorage(getState().cart.items));
};

export const decCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_DEC, payload: id });
  dispatch(saveCartToStorage(getState().cart.items));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE, payload: id });
  dispatch(saveCartToStorage(getState().cart.items));
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CART_CLEAR });
  dispatch(saveCartToStorage([]));
};