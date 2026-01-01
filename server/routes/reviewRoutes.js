const express = require("express");
const Review = require("../models/reviewModel");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Add review
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { imdbID, movieTitle, reviewText, rating } = req.body;
    if (!imdbID || !rating || !reviewText)
      return res.status(400).json({ message: "Missing fields" });

    const review = new Review({
      user: req.user.id,
      movieId: imdbID,
      movieTitle: movieTitle || "Untitled",
      reviewText,
      rating,
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get reviews for a movie
router.get("/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).populate("user", "name");
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update review
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // ✅ Use .equals() to compare ObjectIds safely
    if (!review.user.equals(req.user.id))
      return res.status(403).json({ message: "Not authorized" });

    const { reviewText, rating } = req.body;
    review.reviewText = reviewText || review.reviewText;
    review.rating = rating || review.rating;
    await review.save();

    res.json({ message: "Review updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🗑️ Delete review
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // ✅ Same fix here
    if (!review.user.equals(req.user.id))
      return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
