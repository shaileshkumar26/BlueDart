import { CART_ADD, CART_REMOVE, CART_INC, CART_DEC, CART_CLEAR, CART_HYDRATE } from "../types.js";

const initialState = {
  items: []
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_HYDRATE:
      return { ...state, items: action.payload || [] };

    case CART_ADD: {
      const p = action.payload;
      const existing = state.items.find((x) => x.id === p.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x))
        };
      }
      return {
        ...state,
        items: [...state.items, { id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 }]
      };
    }

    case CART_INC:
      return { ...state, items: state.items.map((x) => (x.id === action.payload ? { ...x, qty: x.qty + 1 } : x)) };

    case CART_DEC:
      return {
        ...state,
        items: state.items.map((x) => (x.id === action.payload ? { ...x, qty: Math.max(1, x.qty - 1) } : x))
      };

    case CART_REMOVE:
      return { ...state, items: state.items.filter((x) => x.id !== action.payload) };

    case CART_CLEAR:
      return { ...state, items: [] };

    default:
      return state;
  }
}