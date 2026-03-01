import { SET_CATEGORY, SET_SEARCH, TOGGLE_SEARCHBAR } from "../types.js";

export const setCategory = (category) => ({ type: SET_CATEGORY, payload: category });
export const setSearch = (value) => ({ type: SET_SEARCH, payload: value });
export const toggleSearchBar = () => ({ type: TOGGLE_SEARCHBAR });