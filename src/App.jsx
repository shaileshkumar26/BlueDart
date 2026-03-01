import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Login from "./pages/Login.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import { useDispatch } from "react-redux";
import { hydrateFromStorage } from "./store/actions/storageActions.js";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}