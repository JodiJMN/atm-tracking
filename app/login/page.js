"use client";

import { useState } from "react";
import { apiRequest } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await apiRequest({
      action: "login",
      email,
      password
    });

    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.user));
      router.push("/dashboard");
    } else {
      alert("Login gagal");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4">Login</h1>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white p-2 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}