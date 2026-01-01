const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/dbConfig");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/users", userRoutes);
app.use("/api/reviews", require("./routes/reviewRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
