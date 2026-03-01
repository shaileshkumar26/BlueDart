import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "../store/reducers/cartReducer.js";
import { wishlistReducer } from "../store/reducers/wishlistReducer.js";
import { productsReducer } from "../store/reducers/productsReducer.js";
import { uiReducer } from "../store/reducers/uiReducer.js";
import ProductCard from "../components/ProductCard.jsx";
import { BrowserRouter } from "react-router-dom";

function makeStore() {
  const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer
  });
  return createStore(rootReducer, applyMiddleware(thunk));
}

describe("ProductCard", () => {
  it("renders product title", () => {
    const store = makeStore();
    const product = {
      id: 1,
      title: "Test Product",
      price: 10,
      image: "https://via.placeholder.com/150",
      category: "electronics",
      rating: { rate: 4.2, count: 10 }
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={product} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});