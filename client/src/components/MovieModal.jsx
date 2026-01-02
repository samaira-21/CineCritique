/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export default function MovieModal({ movie, onClose }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Called when a review is successfully added
  const handleReviewAdded = () => {
    setRefreshTrigger((prev) => prev + 1); // re-renders ReviewList
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-[2px] transition-all duration-300">
      <motion.div
        className="rounded-lg p-6 w-[90%] md:w-[600px] relative
          max-h-[90vh]
          overflow-y-scroll
          [scrollbar-width:none] [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:w-0
          bg-[#FFFFFF] dark:bg-text-light
          border border-[#E0E0E0] dark:border-[#2c2c2c]
          text-[#1A1A1A] dark:text-gray-200
          shadow-[0_0_20px_rgba(0,0,0,0.08)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)]
          transition-colors duration-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
      >

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#A06CD5] transition-colors text-xl"
        >
          ✖
        </button>

        {/* Movie Info */}
        <div className="flex gap-4 mb-4">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-32 h-48 object-cover rounded-md border border-[#E0E0E0] dark:border-[#2c2c2c]"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#A06CD5] dark:text-[#A06CD5]">
              {movie.Title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{movie.Year}</p>
          </div>
        </div>

        {/* Review Form + List */}
        <ReviewForm imdbID={movie.imdbID} onReviewAdded={handleReviewAdded} />
        <ReviewList imdbID={movie.imdbID} refreshTrigger={refreshTrigger} />
      </motion.div>
    </div>
  );
}
