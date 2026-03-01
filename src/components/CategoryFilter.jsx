import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/actions/uiActions.js";
import { fetchProducts } from "../store/actions/productsActions.js";

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const { categories } = useSelector((s) => s.products);
  const { selectedCategory } = useSelector((s) => s.ui);

  const onPick = (c) => {
    dispatch(setCategory(c));
    dispatch(fetchProducts(c));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onPick(c)}
            className={`px-4 py-2 rounded-2xl border text-sm capitalize transition
              ${
                selectedCategory === c
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white border-slate-200 hover:bg-slate-100"
              }`}
          >
            {c === "men's clothing" ? "men" : c === "women's clothing" ? "women" : c}
          </button>
        ))}
      </div>
    </section>
  );
}