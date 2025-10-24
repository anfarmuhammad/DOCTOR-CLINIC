import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    const res = await login(email.trim(), password);
    if (res.ok) navigate("/dashboard");
    else setErr(res.error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl mb-4 text-white">Clinic Login</h2>
        {err && <div className="mb-2 text-red-400">{err}</div>}
        <label className="block mb-2 text-white">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded mt-1 bg-slate-800 text-white"
            required
          />
        </label>
        <label className="block mb-4 text-white">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded mt-1 bg-slate-800 text-white"
            required
          />
        </label>
        <button className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
          Login
        </button>
      </form>
    </div>
  );
}
