import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/actions/productsActions.js";
import { addToCart } from "../store/actions/cartActions.js";
import { addToWishlist, removeFromWishlist } from "../store/actions/wishlistActions.js";
import { FiStar, FiTruck, FiShield, FiCreditCard, FiHeart } from "react-icons/fi";

function money(n) {
  return `₹${Math.round(n * 83).toLocaleString("en-IN")}`;
}

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((s) => s.cart);
  const { items: wishItems } = useSelector((s) => s.wishlist);

  const [product, setProduct] = useState(null);
  const [err, setErr] = useState("");

  const inCart = cartItems.some((x) => x.id === Number(id));
  const inWish = wishItems.some((x) => x.id === Number(id));

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await dispatch(fetchSingleProduct(id));
        if (active) setProduct(data);
      } catch (e) {
        if (active) setErr(e.message || "Failed to load product");
      }
    })();
    return () => {
      active = false;
    };
  }, [dispatch, id]);

  if (err) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-red-600">{err}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-slate-600">Loading...</div>
      </div>
    );
  }

  const original = product.price * 1.25;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-slate-600 hover:underline">
        ← Back to products
      </Link>

      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="h-80 object-contain" />
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="text-xs text-slate-500 capitalize">{product.category}</div>
          <h1 className="text-2xl font-bold mt-2">{product.title}</h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <FiStar />
            <span>{(product.rating?.rate ?? 4.2).toFixed(1)}</span>
            <span className="text-slate-400">({product.rating?.count ?? 120} reviews)</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold">{money(product.price)}</span>
            <span className="text-slate-500 line-through">{money(original)}</span>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">Special Offer</span>
          </div>

          <div className="mt-4 text-slate-600 text-sm leading-6">{product.description}</div>

          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <FiTruck /> Delivery by <b>3-5 days</b>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <FiShield /> Free returns <b>7 days</b>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <FiCreditCard /> Payment: <b>UPI/Card</b>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-3">
              Units: <b>In stock</b>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => dispatch(addToCart(product))}
              className={`flex-1 px-4 py-3 rounded-2xl font-medium transition ${
                inCart ? "bg-slate-100 border border-slate-200" : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {inCart ? "Go to Cart (already added)" : "Add to Cart"}
            </button>

            <button
              onClick={() => (inWish ? dispatch(removeFromWishlist(product.id)) : dispatch(addToWishlist(product)))}
              className={`px-4 py-3 rounded-2xl border transition flex items-center justify-center gap-2 ${
                inWish ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 hover:bg-slate-100"
              }`}
            >
              <FiHeart />
              {inWish ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4">
            <h2 className="font-semibold">Key Features</h2>
            <ul className="mt-2 text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li>Premium quality product from FakeStore API</li>
              <li>Responsive design with Tailwind CSS</li>
              <li>Cart & Wishlist saved in localStorage</li>
              <li>Built using React + Redux + Thunk</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}