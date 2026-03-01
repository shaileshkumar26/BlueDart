import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiBell,
  FiLogIn,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearchBar, setSearch } from '../store/actions/uiActions.js';

export default function Header() {
  const { items: cartItems } = useSelector((s) => s.cart);
  const { items: wishItems } = useSelector((s) => s.wishlist);
  const { showSearch, search } = useSelector((s) => s.ui);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, x) => sum + x.qty, 0);
  const wishCount = wishItems.length;

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
            B
          </div>
          <div>
            <div className="font-semibold leading-4">BitCart</div>
            <div className="text-xs text-slate-500 -mt-0.5">Shop smarter</div>
          </div>
        </Link>

        <div className="flex-1" />

        <form onSubmit={onSearchSubmit} className="hidden md:block">
          {showSearch ? (
            <input
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Search products..."
              className="w-72 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          ) : null}
        </form>

        <button
          onClick={() => dispatch(toggleSearchBar())}
          className="p-2 rounded-xl hover:bg-slate-100"
          title="Search"
        >
          <FiSearch className="text-xl" />
        </button>

        <Link
          to="/wishlist"
          className="relative p-2 rounded-xl hover:bg-slate-100"
          title="Wishlist"
        >
          <FiHeart className="text-xl" />
          {wishCount > 0 ? (
            <span className="absolute -top-1 -right-1 text-xs bg-slate-900 text-white rounded-full px-2 py-0.5">
              {wishCount}
            </span>
          ) : null}
        </Link>

        <Link
          to="/cart"
          className="relative p-2 rounded-xl hover:bg-slate-100"
          title="Cart"
        >
          <FiShoppingCart className="text-xl" />
          {cartCount > 0 ? (
            <span className="absolute -top-1 -right-1 text-xs bg-slate-900 text-white rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          ) : null}
        </Link>

        <button
          className="p-2 rounded-xl hover:bg-slate-100"
          title="Notifications"
        >
          <FiBell className="text-xl" />
        </button>

        <Link
          to="/login"
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
        >
          <FiLogIn />
          Login
        </Link>
      </div>

      {showSearch ? (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={onSearchSubmit}>
            <input
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Search products..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </form>
        </div>
      ) : null}
    </header>
  );
}
