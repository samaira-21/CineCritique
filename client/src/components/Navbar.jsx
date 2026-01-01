/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import ThemeBtn from "./ThemeBtn";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      className="flex justify-between items-center px-8 py-4 
      bg-[#F3F2F7] dark:bg-[#1b1b1b] 
      text-[#1A1A1A] dark:text-gray-300
      backdrop-blur-md border-b border-[#d0d0d0] dark:border-gray-800 
      shadow-sm transition-all duration-300"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🎬 Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-[#A06CD5] hover:opacity-90 transition"
      >
        CineCritique 🎬
      </Link>

      {/* 🔗 Navigation links */}
      <div className="flex items-center space-x-8 font-medium text-[#1A1A1A] dark:text-gray-300">
        <Link
          to="/"
          className="hover:text-[#A06CD5] transition"
        >
          Home
        </Link>

        {user ? (
          <>
            <Link
              to="/profile"
              className="hover:text-[#A06CD5] transition"
            >
              Profile
            </Link>

            <div className="flex items-center justify-center">
              <ThemeBtn />
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-[#A06CD5] dark:bg-[#A06CD5] hover:bg-[#8E5CCF] dark:hover:bg-[#8E5CCF] 
              px-3 py-1 rounded text-white transition-colors"
            >
              Logout
            </button>

            
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-[#A06CD5] transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-[#A06CD5] transition"
            >
              Signup
            </Link>

            <div className="flex items-center justify-center">
              <ThemeBtn />
            </div>
          </>
        )}
      </div>
    </motion.nav>
  );
}
