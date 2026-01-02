/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ imdbID, onReviewAdded }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please log in to write a review!");

    try {
      await axios.post(
        "http://localhost:5000/api/reviews",
        { imdbID, reviewText: review, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review added!");
      setReview("");
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      alert("Error adding review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 transition-colors duration-300">
      {/* Review Textarea */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-3 rounded-lg mb-3 outline-none resize-none
        bg-[#FFFFFF] dark:bg-text-light
        text-[#1A1A1A] dark:text-gray-200
        border border-[#E0E0E0] dark:border-[#2c2c2c]
        focus:border-[#A06CD5] dark:focus:border-[#A06CD5]
        shadow-[0_0_6px_rgba(0,0,0,0.05)] dark:shadow-[0_0_6px_rgba(0,0,0,0.4)]
        transition-all duration-300"
        rows="3"
        required
      />

      {/* Rating + Submit Button */}
      <div className="flex justify-between items-center">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="p-2 rounded-md
          bg-[#FFFFFF] dark:bg-text-light
          text-[#1A1A1A] dark:text-gray-200
          border border-[#E0E0E0] dark:border-[#2c2c2c]
          focus:border-[#A06CD5] dark:focus:border-[#A06CD5]
          transition-colors duration-300"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r}⭐</option>
          ))}
        </select>

        <button
          className="px-4 py-2 rounded-md font-medium
          bg-[#A06CD5] hover:bg-[#8E5CCF]
          dark:bg-[#A06CD5] dark:hover:bg-[#8E5CCF]
          text-white shadow-md
          transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
        >
          Post Review
        </button>
      </div>
    </form>
  );
}
