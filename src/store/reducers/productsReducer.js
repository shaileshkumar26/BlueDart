import { PRODUCTS_LOADING, PRODUCTS_SUCCESS, PRODUCTS_ERROR, CATEGORIES_SUCCESS } from "../types.js";

const initialState = {
  loading: false,
  error: null,
  items: [],
  categories: []
};

export function productsReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return { ...state, loading: true, error: null };
    case PRODUCTS_SUCCESS:
      return { ...state, loading: false, items: action.payload, error: null };
    case CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}