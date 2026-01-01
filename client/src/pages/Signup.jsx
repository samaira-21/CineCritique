/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleResponse = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post("http://localhost:5000/api/users/google", { token: credential });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Google signup failed:", err);
      alert("Google Sign-up failed");
    }
  };

  // Safe Google login initialization
  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google && google.accounts && google.accounts.id) {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });

        google.accounts.id.renderButton(
          document.getElementById("googleSignUpDiv"),
          { theme: "outline", size: "large", width: "100%" }
        );
      }
    };

    // Check every 100ms until the script loads
    const interval = setInterval(() => {
      if (window.google) {
        initializeGoogle();
        clearInterval(interval);
      }
    }, 100);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-white dark:bg-black">
      <form
        onSubmit={handleSignup}
        className="bg-[#F3F2F7] dark:bg-[#1A1A1A] p-8 rounded-2xl shadow w-80 border border-[#E0E0E0] dark:border-[#2C2C2C]"
      >
        <h1 className="text-[#A06CD5] text-3xl font-bold mb-6 text-center">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          className="w-full p-2.5 mb-4 rounded-lg border outline-none focus:border-[#A06CD5]"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          className="w-full p-2.5 mb-4 rounded-lg border outline-none focus:border-[#A06CD5]"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          className="w-full p-2.5 mb-4 rounded-lg border outline-none focus:border-[#A06CD5]"
        />

        <button
          type="submit"
          className="w-full mt-6 py-3 rounded-lg text-white bg-accent hover:bg-[#8E5CCF]!"
        >
          Sign Up
        </button>

        <div id="googleSignUpDiv" className="mt-4 p-1 rounded-lg hover:bg-[#a06cd5]"></div>
      </form>
    </div>
  );
}
