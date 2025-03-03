const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const URL = "mongodb+srv://rofthaziu:NjFc94xPgDTxMLAu@vagabondstudio.f7v1i.mongodb.net/vagabondstudio?retryWrites=true&w=majority";
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

const Merch = mongoose.model("Merch", merchSchema);
const Game = mongoose.model("Game", gameSchema);
const News = mongoose.model("News", newsSchema);

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





// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
