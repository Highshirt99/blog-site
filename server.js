const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const errorResponserHandler = errorHandler.errorResponserHandler;
const invalidPathHandler = errorHandler.invalidPathHandler;

// Routes

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes"); 
const commentRoutes = require("./routes/commentRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);

app.use(errorResponserHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

connectDB();
