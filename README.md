# BitCart 🛒 (E-commerce SPA)

BitCart is a responsive e-commerce website built using **React**, **Redux**, **Redux-Thunk**, **TailwindCSS**, and **React Router**.
It fetches product data dynamically from **FakeStore API** and allows users to search products, filter by categories, view product details, and manage Cart/Wishlist with persistence via **localStorage**.

## ✅ Key Features
- Dashboard (Landing Page) with Banner/Carousel
- Fixed Header: Logo, Search toggle, Cart count, Wishlist count, Login, Notifications
- Category Filter (API based)
- Search functionality (by product title)
- Product Details Page
- Cart Page: add/remove/increase/decrease qty + dynamic total
- Wishlist Page: add/remove + move to cart
- localStorage persistence for Cart & Wishlist
- Login validation (email + password)
- Unit test using React Testing Library + Vitest
- Fully responsive UI

## 🧰 Tech Stack
React, Redux, Redux-Thunk, React Router DOM, TailwindCSS, React Icons, FakeStore API

## ⚙️ Run Locally
```bash
npm install
npm run dev