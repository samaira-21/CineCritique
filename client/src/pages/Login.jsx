/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      console.log("User logged in successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  const handleGoogleResponse = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post("http://localhost:5000/api/users/google", { token: credential });
      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      console.log("User logged in successfully");
      navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google Sign-in failed");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && google.accounts) {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });

        google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large", width: "100%" }
        );

        clearInterval(interval);
      }
    }, 100);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-white dark:bg-black">
      <form onSubmit={handleLogin} className="bg-[#F3F2F7] dark:bg-[#1A1A1A] p-8 rounded-2xl shadow w-80 border border-[#E0E0E0] dark:border-[#2C2C2C]">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#A06CD5]">Login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full p-2.5 mb-4 rounded-lg border outline-none focus:border-[#A06CD5]" />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full p-2.5 mb-5 rounded-lg border outline-none focus:border-[#A06CD5]" />
        <button type="submit" className="w-full py-2.5 rounded-lg text-white bg-[#A06CD5] hover:bg-[#8E5CCF]">Login</button>
        <div id="googleSignInDiv" className="mt-4 p-1 rounded-lg hover:bg-[#a06cd5]"></div>
      </form>
    </div>
  );
}
