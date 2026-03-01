import { CART_HYDRATE, WISHLIST_HYDRATE } from "../types.js";

const CART_KEY = "bitcart_cart";
const WISHLIST_KEY = "bitcart_wishlist";

export const saveCartToStorage = (items) => () => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const saveWishlistToStorage = (items) => () => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
};

export const hydrateFromStorage = () => (dispatch) => {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");

    dispatch({ type: CART_HYDRATE, payload: cart });
    dispatch({ type: WISHLIST_HYDRATE, payload: wishlist });
  } catch {
    dispatch({ type: CART_HYDRATE, payload: [] });
    dispatch({ type: WISHLIST_HYDRATE, payload: [] });
  }
};