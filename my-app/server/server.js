const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require('dotenv').config();
const URL = process.env.URL;
console.log("MongoDB URL:", process.env.URL); // Debugging line


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Define Schemas and Models
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const merchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }, // Add category support
  price: { type: Number, required: true } // Add price field
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true }, // Full-Time, Part-Time, etc.
  description: { type: String, required: false },
});

const Merch = mongoose.model("Merch", merchSchema);
const Game = mongoose.model("Game", gameSchema);
const News = mongoose.model("News", newsSchema);
const Job = mongoose.model("Job", jobSchema);

// Routes for Games
app.get("/api/games", async (req, res) => {           // fetches data from server (read)
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

app.post("/api/games", async (req, res) => { // sends data to server (create)
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newGame = new Game({ title, description, image });
    await newGame.save();
    res.json(newGame);
  } catch (err) {
    console.error("Error adding game:", err);
    res.status(500).json({ error: "Failed to add game" });
  }
});

app.delete("/api/games/:id", async (req, res) => { // deletes data from server (delete)
  try {
    const { id } = req.params;
    const result = await Game.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json({ message: "Game deleted successfully", game: result });
  } catch (err) {
    console.error("Error deleting game:", err);
    res.status(500).json({ error: "Failed to delete game" });
  }
});

// Routes for News
app.get("/api/news", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.post("/api/news", async (req, res) => {
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newNews = new News({ title, description, image });
    await newNews.save();
    res.json(newNews);
  } catch (err) {
    console.error("Error adding news:", err);
    res.status(500).json({ error: "Failed to add news" });
  }
});

app.delete("/api/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await News.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "News not found" });
    }
    res.json({ message: "News deleted successfully", news: result });
  } catch (err) {
    console.error("Error deleting news:", err);
    res.status(500).json({ error: "Failed to delete news" });
  }
});







// Fetch all merch items
app.get("/api/merch", async (req, res) => {
  try {
    const merch = await Merch.find();
    res.json(merch);
  } catch (err) {
    console.error("Error fetching merch:", err);
    res.status(500).json({ error: "Failed to fetch merch" });
  }
});

// Add a new merch item
app.post("/api/merch", async (req, res) => {
  const { title, description, image, category, price } = req.body;
  if (!title || !description || !image || !category || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newMerch = new Merch({ title, description, image, category, price });
    await newMerch.save();
    res.json(newMerch);
  } catch (err) {
    console.error("Error adding merch:", err);
    res.status(500).json({ error: "Failed to add merch" });
  }
});

// Delete a merch item
app.delete("/api/merch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Merch.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Merch item not found" });
    }
    res.json({ message: "Merch item deleted successfully", merch: result });
  } catch (err) {
    console.error("Error deleting merch:", err);
    res.status(500).json({ error: "Failed to delete merch" });
  }
});







// POST /api/jobs - Create a new job
app.post("/api/jobs", async (req, res) => {
  const { title, location, type } = req.body;
  if (!title || !location || !type) {
    return res.status(400).json({ error: "All fields (title, location, type) are required" });
  }

  try {
    const newJob = new Job({ title, location, type });
    await newJob.save();
    res.status(201).json(newJob);  // Respond with the created job and status 201
  } catch (err) {
    console.error("Error adding job:", err);
    res.status(500).json({ error: "Failed to add job" });
  }
});

// GET /api/jobs - Fetch all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// DELETE /api/jobs/:id - Delete a job by ID
app.delete("/api/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Job.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json({ message: "Job deleted successfully", job: result });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ error: "Failed to delete job" });
  }
});





// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
