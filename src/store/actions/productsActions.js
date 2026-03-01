import { PRODUCTS_LOADING, PRODUCTS_SUCCESS, PRODUCTS_ERROR, CATEGORIES_SUCCESS } from "../types.js";

const API = "https://fakestoreapi.com";

export function fetchCategories() {
  return async (dispatch) => {
    try {
      const res = await fetch(`${API}/products/categories`);
      const data = await res.json();
      dispatch({ type: CATEGORIES_SUCCESS, payload: ["all", ...data] });
    } catch {
      dispatch({ type: CATEGORIES_SUCCESS, payload: ["all"] });
    }
  };
}

export function fetchProducts(category = "all") {
  return async (dispatch) => {
    dispatch({ type: PRODUCTS_LOADING });
    try {
      const url =
        category === "all"
          ? `${API}/products`
          : `${API}/products/category/${encodeURIComponent(category)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      dispatch({ type: PRODUCTS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: PRODUCTS_ERROR, payload: e.message || "Something went wrong" });
    }
  };
}

export function fetchSingleProduct(id) {
  return async () => {
    const res = await fetch(`${API}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  };
}