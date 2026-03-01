import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../store/actions/wishlistActions.js";
import { addToCart } from "../store/actions/cartActions.js";
import { Link } from "react-router-dom";

function money(n) {
  return `₹${Math.round(n * 83).toLocaleString("en-IN")}`;
}

export default function Wishlist() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.wishlist);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wishlist</h1>
          <p className="text-sm text-slate-600 mt-1">Save products for later buying.</p>
        </div>
        {items.length > 0 ? (
          <button
            onClick={() => dispatch(clearWishlist())}
            className="px-4 py-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-100"
          >
            Clear Wishlist
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-8 text-slate-600">
          Your wishlist is empty. <Link className="underline" to="/">Browse products</Link>
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-3xl p-4">
              <Link to={`/product/${p.id}`} className="block">
                <div className="h-40 flex items-center justify-center">
                  <img src={p.image} alt={p.title} className="h-36 object-contain" />
                </div>
                <div className="mt-2 font-semibold line-clamp-2 min-h-[40px]">{p.title}</div>
                <div className="mt-2 font-bold">{money(p.price)}</div>
              </Link>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => dispatch(addToCart(p))}
                  className="flex-1 px-3 py-2 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(p.id))}
                  className="px-3 py-2 rounded-2xl border border-slate-200 hover:bg-slate-100 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}