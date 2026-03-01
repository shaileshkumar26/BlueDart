import { WISHLIST_ADD, WISHLIST_REMOVE, WISHLIST_CLEAR } from "../types.js";
import { saveWishlistToStorage } from "./storageActions.js";

export const addToWishlist = (product) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_ADD, payload: product });
  dispatch(saveWishlistToStorage(getState().wishlist.items));
};

export const removeFromWishlist = (id) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_REMOVE, payload: id });
  dispatch(saveWishlistToStorage(getState().wishlist.items));
};

export const clearWishlist = () => (dispatch) => {
  dispatch({ type: WISHLIST_CLEAR });
  dispatch(saveWishlistToStorage([]));
};