import { SET_CATEGORY, SET_SEARCH, TOGGLE_SEARCHBAR } from "../types.js";

const initialState = {
  selectedCategory: "all",
  search: "",
  showSearch: false
};

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    case TOGGLE_SEARCHBAR:
      return { ...state, showSearch: !state.showSearch, search: state.showSearch ? "" : state.search };
    default:
      return state;
  }
}