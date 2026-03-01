import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiStar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/actions/cartActions.js";
import { addToWishlist, removeFromWishlist } from "../store/actions/wishlistActions.js";

function money(n) {
  return `₹${Math.round(n * 83).toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((s) => s.cart);
  const { items: wishItems } = useSelector((s) => s.wishlist);

  const inCart = cartItems.some((x) => x.id === product.id);
  const inWish = wishItems.some((x) => x.id === product.id);

  const original = product.price * 1.25;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-md transition">
      <div className="p-4 relative">
        <button
          onClick={() => (inWish ? dispatch(removeFromWishlist(product.id)) : dispatch(addToWishlist(product)))}
          className={`absolute top-4 right-4 p-2 rounded-xl border ${
            inWish
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white border-slate-200 hover:bg-slate-100"
          }`}
          title={inWish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart />
        </button>

        <Link to={`/product/${product.id}`} className="block">
          <div className="h-44 flex items-center justify-center">
            <img src={product.image} alt={product.title} className="h-40 object-contain" />
          </div>
          <div className="mt-3">
            <div className="text-xs text-slate-500 capitalize">{product.category}</div>
            <div className="font-semibold mt-1 line-clamp-2 min-h-[40px]">{product.title}</div>

            <div className="mt-2 flex items-center gap-2">
              <span className="font-bold">{money(product.price)}</span>
              <span className="text-sm text-slate-500 line-through">{money(original)}</span>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">-20%</span>
            </div>

            <div className="mt-2 flex items-center gap-1 text-sm text-slate-600">
              <FiStar />
              <span>{(product.rating?.rate ?? 4.2).toFixed(1)}</span>
              <span className="text-slate-400">({product.rating?.count ?? 120})</span>
            </div>
          </div>
        </Link>

        <button
          onClick={() => dispatch(addToCart(product))}
          className={`mt-4 w-full px-4 py-2.5 rounded-2xl font-medium transition
            ${
              inCart
                ? "bg-slate-100 text-slate-900 border border-slate-200"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
        >
          {inCart ? "Go to Cart (already added)" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}