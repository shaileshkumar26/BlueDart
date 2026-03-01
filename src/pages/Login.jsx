import React, { useState } from "react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [touched, setTouched] = useState(false);
  const [msg, setMsg] = useState("");

  const emailOk = isValidEmail(email);
  const passOk = pass.length >= 6;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!emailOk || !passOk) {
      setMsg("Please fix validation errors.");
      return;
    }
    setMsg("Login successful (demo).");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-slate-600 mt-1">Demo login with validation (no backend).</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="name@example.com"
            />
            {touched && !emailOk ? <div className="text-xs text-red-600 mt-1">Enter a valid email.</div> : null}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onBlur={() => setTouched(true)}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Minimum 6 characters"
            />
            {touched && !passOk ? (
              <div className="text-xs text-red-600 mt-1">Password must be at least 6 characters.</div>
            ) : null}
          </div>

          <button className="w-full px-4 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800">
            Login
          </button>

          {msg ? (
            <div className={`text-sm mt-2 ${msg.includes("successful") ? "text-green-700" : "text-red-700"}`}>
              {msg}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}