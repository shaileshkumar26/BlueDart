import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incCart, decCart, removeFromCart, clearCart } from "../store/actions/cartActions.js";
import { Link } from "react-router-dom";

function money(n) {
  return `₹${Math.round(n * 83).toLocaleString("en-IN")}`;
}

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.cart);

  const total = useMemo(() => items.reduce((sum, x) => sum + x.price * x.qty, 0), [items]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cart</h1>
          <p className="text-sm text-slate-600 mt-1">Manage items and see total price update dynamically.</p>
        </div>
        {items.length > 0 ? (
          <button
            onClick={() => dispatch(clearCart())}
            className="px-4 py-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-100"
          >
            Clear Cart
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-8 text-slate-600">
          Your cart is empty. <Link className="underline" to="/">Go shopping</Link>
        </div>
      ) : (
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map((x) => (
              <div key={x.id} className="bg-white border border-slate-200 rounded-3xl p-4 flex gap-4">
                <img src={x.image} alt={x.title} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <div className="font-semibold line-clamp-2">{x.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{money(x.price)} each</div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decCart(x.id))}
                      className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{x.qty}</span>
                    <button
                      onClick={() => dispatch(incCart(x.id))}
                      className="w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-100"
                    >
                      +
                    </button>

                    <div className="flex-1" />

                    <button
                      onClick={() => dispatch(removeFromCart(x.id))}
                      className="px-3 py-2 rounded-2xl border border-slate-200 hover:bg-slate-100 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="font-bold">{money(x.price * x.qty)}</div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 h-fit">
            <h2 className="font-semibold text-lg">Order Summary</h2>
            <div className="mt-4 text-sm text-slate-600 space-y-2">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{items.reduce((sum, x) => sum + x.qty, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </div>

            <button className="mt-5 w-full px-4 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800">
              Checkout (Demo)
            </button>

            <div className="mt-4 text-xs text-slate-500">
              This is a frontend-only demo project. Checkout is a placeholder UI.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}