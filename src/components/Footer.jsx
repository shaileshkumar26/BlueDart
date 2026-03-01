import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-semibold text-lg">BitCart</div>
          <p className="text-sm text-slate-600 mt-2">
            A simple e-commerce experience built with React, Redux, Thunk,
            Tailwind and FakeStore API.
          </p>
        </div>

        <div>
          <div className="font-semibold">Quick Links</div>
          <ul className="text-sm text-slate-600 mt-2 space-y-2">
            <li>Home</li>
            <li>Wishlist</li>
            <li>Cart</li>
            <li>Login</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Support</div>
          <ul className="text-sm text-slate-600 mt-2 space-y-2">
            <li>Free Shipping</li>
            <li>Free Returns</li>
            <li>24/7 Support</li>
            <li>Secure Payments</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Newsletter</div>
          <p className="text-sm text-slate-600 mt-2">
            Subscribe for offers and updates.
          </p>
          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Email address"
            />
            <button className="px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
              Subscribe
            </button>
          </div>
          <div className="text-sm text-slate-600 mt-4">
            Contact: +91-90000-00000 <br />
            Email: support@bitcart.com
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 py-4 border-t border-slate-200">
        © {new Date().getFullYear()} BitCart. All rights reserved.
      </div>
    </footer>
  );
}
