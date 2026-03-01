import { WISHLIST_ADD, WISHLIST_REMOVE, WISHLIST_CLEAR, WISHLIST_HYDRATE } from "../types.js";

const initialState = {
  items: []
};

export function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_HYDRATE:
      return { ...state, items: action.payload || [] };

    case WISHLIST_ADD: {
      const p = action.payload;
      const exists = state.items.some((x) => x.id === p.id);
      if (exists) return state;
      return { ...state, items: [...state.items, { id: p.id, title: p.title, price: p.price, image: p.image }] };
    }

    case WISHLIST_REMOVE:
      return { ...state, items: state.items.filter((x) => x.id !== action.payload) };

    case WISHLIST_CLEAR:
      return { ...state, items: [] };

    default:
      return state;
  }
}