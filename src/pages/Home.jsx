import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fetchCategories, fetchProducts } from "../store/actions/productsActions.js";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector((s) => s.products);
  const { search } = useSelector((s) => s.ui);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts("all"));
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.title.toLowerCase().includes(q));
  }, [items, search]);

  return (
    <div>
      <Banner />
      <CategoryFilter />

      <section className="max-w-6xl mx-auto px-4 mt-8 mb-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-slate-600 text-sm mt-1">
              Browse products, add to cart, or save to wishlist.
            </p>
          </div>
          <div className="text-sm text-slate-500">{filtered.length} items</div>
        </div>

        {loading ? (
          <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-8 text-slate-600">
            Loading products...
          </div>
        ) : error ? (
          <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-8 text-red-600">
            {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-8 text-slate-600">
            No products match your search.
          </div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-6">
          <h3 className="text-lg font-semibold">FAQ</h3>
          <div className="mt-4 space-y-3">
            <details className="border border-slate-200 rounded-2xl p-4">
              <summary className="cursor-pointer font-medium">Do you offer free shipping?</summary>
              <p className="mt-2 text-sm text-slate-600">Yes, we offer free shipping on all products (demo policy).</p>
            </details>
            <details className="border border-slate-200 rounded-2xl p-4">
              <summary className="cursor-pointer font-medium">How do returns work?</summary>
              <p className="mt-2 text-sm text-slate-600">Free returns within 7 days (demo policy).</p>
            </details>
            <details className="border border-slate-200 rounded-2xl p-4">
              <summary className="cursor-pointer font-medium">Is payment secure?</summary>
              <p className="mt-2 text-sm text-slate-600">This is a frontend-only demo. Payment options are UI placeholders.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}