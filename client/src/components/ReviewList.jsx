/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewList({ imdbID, refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  const token = localStorage.getItem("token");

  let userId = null;
  try {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      userId = decoded.id || decoded.user || decoded._id;
    }
  } catch (err) {
    console.warn("Invalid token:", err);
  }

  useEffect(() => {
    if (imdbID) fetchReviews();
  }, [imdbID, refreshTrigger]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/${imdbID}`);
      setReviews(res.data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviews([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting review:", err.response?.data || err);
      alert("Failed to delete review. Check console for details.");
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditText(review.reviewText);
    setEditRating(review.rating);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reviews/${id}`,
        { reviewText: editText, rating: editRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      fetchReviews();
    } catch (err) {
      console.error("Error updating review:", err.response?.data || err);
      alert("Failed to update review. Check console for details.");
    }
  };

  return (
    <div className="space-y-3 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-2 text-[#A06CD5]">Reviews</h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">No reviews yet.</p>
      ) : (
        reviews.map((r) => {
          const isOwner = userId && r.user?._id === userId;

          return (
            <div
              key={r._id}
              className="p-3 rounded-lg border transition-all duration-300
              bg-[#FFFFFF] dark:bg-text-light
              border-[#E0E0E0] dark:border-[#2c2c2c]
              shadow-[0_0_6px_rgba(0,0,0,0.05)] dark:shadow-[0_0_6px_rgba(0,0,0,0.4)]
              hover:border-[#A06CD5]"
            >
              {editingId === r._id ? (
                <div className="space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 rounded-lg resize-none outline-none
                    bg-[#FFFFFF] dark:bg-text-light
                    text-[#1A1A1A] dark:text-gray-200
                    border border-[#E0E0E0] dark:border-[#2c2c2c]
                    focus:border-[#A06CD5] dark:focus:border-[#A06CD5]"
                    rows="2"
                  />

                  <div className="flex justify-between items-center">
                    <select
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                      className="p-2 rounded-md
                      bg-[#FFFFFF] dark:bg-text-light
                      text-[#1A1A1A] dark:text-gray-200
                      border border-[#E0E0E0] dark:border-[#2c2c2c]
                      focus:border-[#A06CD5] dark:focus:border-[#A06CD5]"
                    >
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r}⭐</option>
                      ))}
                    </select>

                    <div className="space-x-2">
                      <button
                        onClick={() => handleUpdate(r._id)}
                        className="px-3 py-1 rounded-md bg-[#A06CD5] hover:bg-[#8E5CCF] text-white transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 rounded-md bg-gray-400 hover:bg-gray-500 text-white transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-[#1A1A1A] dark:text-gray-200">{r.reviewText}</p>
                  <p className="text-[#ba68c8] dark:text-[#ba68c8] text-sm mt-1">
                    ⭐ {r.rating}/5
                  </p>
                  <p className="text-[#777777] dark:text-gray-500 text-xs mt-1">
                    – {r.user?.name || "Anonymous"}
                  </p>

                  {isOwner && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(r)}
                        className="text-sm px-2 py-1 rounded bg-[#A06CD5] hover:bg-[#8E5CCF] text-white transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-sm px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
