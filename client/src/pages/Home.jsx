/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (!query) return;
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=478b4090&s=${query}`);
      setMovies(res.data.Search || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F2F7] dark:bg-bg text-[#1A1A1A] dark:text-gray-200 transition-colors duration-300">
      
      {/* 🎬 HERO SECTION */}
<section className="text-center py-16 transition-colors duration-500">
  <motion.h1
    className="text-4xl md:text-5xl font-bold text-[#A06CD5] mb-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    Discover, Review & Rate Movies
  </motion.h1>

  <p className="text-[#555555] dark:text-gray-400 max-w-xl mx-auto mb-8">
    Search for your favorite movies, share your thoughts, and see what others are saying — all in one place.
  </p>

  <motion.form
    onSubmit={(e) => {
      e.preventDefault();
      searchMovies();
    }}
    className="flex justify-center mb-10"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="p-2 w-72 rounded-l-lg bg-card-light dark:bg-[#2a2a2a] text-[#1A1A1A] dark:text-white border border-[#d0d0d0] dark:border-gray-700 focus:border-[#A06CD5] outline-none transition-colors duration-300"
      placeholder="Search movies..."
    />
    <button
      type="submit"
      className="bg-[#A06CD5] px-4 py-2 rounded-r-lg text-white hover:bg-[#8E5CCF] dark:hover:bg-[#8E5CCF] transition-colors duration-200"
    >
      Search
    </button>
  </motion.form>
</section>


      {/* 🎥 MOVIE RESULTS */}
      <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-[#F3F2F7] dark:bg-[#0E0E0E] transition-colors duration-500">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p
            className="text-center col-span-full text-[15px] md:text-base font-medium
            text-[#3a3a3a] dark:text-gray-300
            bg-[#FAF9FC] dark:bg-[#1A1A1A]
            backdrop-blur-sm rounded-lg px-3 py-2 inline-block mx-auto
            shadow-sm dark:shadow-[0_0_8px_rgba(255,255,255,0.03)]
            transition-colors duration-300"
          >
            🎥 Try searching for a movie to get started 🍿
          </p>
        )}
      </div>

      {/* 🌟 FEATURES / ABOUT SECTION */}
      <section className="bg-[#F5F4F8] dark:bg-bg text-center py-16 border-t border-[#e2e2e2] dark:border-text-light transition-colors duration-300">
        <h2 className="text-3xl font-semibold mb-6 text-[#A06CD5]">Why CineCritique?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
          <FeatureCard title="🔍 Explore Movies" text="Search any title from the OMDb database instantly." />
          <FeatureCard title="📝 Write Reviews" text="Add your own reviews and see them on your profile." />
          <FeatureCard title="⭐ Personalized Profile" text="Track your activity and review count easily." />
          <FeatureCard title="🎬 Built for Cinephiles" text="A sleek movie platform made with React & Node.js." />
        </div>
      </section>

      {/* 🧾 FOOTER */}
      <footer className="text-center py-6 bg-[#F3F2F7] dark:bg-[#0B0B0B] text-[#5A5A5A] dark:text-gray-500 text-sm border-t border-[#e2e2e2] dark:border-text-light transition-colors duration-300">
        <p>
          © 2025 <span className="text-[#A06CD5] font-semibold">CineCritique</span> — By Samaira Arora & Naina.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <motion.div
      className="bg-[#FFFFFF] dark:bg-[#1B1B1B] p-6 rounded-lg shadow-md border border-[#e2e2e2] dark:border-card hover:border-[#A06CD5] transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-lg font-semibold text-[#A06CD5] mb-2">{title}</h3>
      <p className="text-[#555555] dark:text-gray-400 text-sm">{text}</p>
    </motion.div>
  );
}
