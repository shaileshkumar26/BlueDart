import React, { useEffect, useState } from "react";

const slides = [
  { title: "Mega Deals", desc: "Up to 40% off on trending products", cta: "Shop Now" },
  { title: "Fast Delivery", desc: "Reliable delivery with secure packaging", cta: "Explore" },
  { title: "Wishlist & Save", desc: "Save items for later and buy anytime", cta: "Start Saving" }
];

export default function Banner() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, []);

  const s = slides[idx];

  return (
    <section className="max-w-6xl mx-auto px-4 pt-6">
      <div className="rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-br from-white to-slate-100">
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-widest text-slate-500">BitCart Specials</div>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">{s.title}</h1>
            <p className="text-slate-600 mt-3 text-base md:text-lg">{s.desc}</p>
            <button className="mt-6 px-5 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800">
              {s.cta}
            </button>
          </div>

          <div className="w-full md:w-80">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="text-sm text-slate-600">What we sell</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Free Shipping</span>
                  <span className="text-slate-500">₹0</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Free Returns</span>
                  <span className="text-slate-500">7 days</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>24/7 Support</span>
                  <span className="text-slate-500">Chat</span>
                </li>
              </ul>

              <div className="mt-5 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-2 flex-1 rounded-full ${i === idx ? "bg-slate-900" : "bg-slate-200"}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}