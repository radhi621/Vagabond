const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();





require('dotenv').config();
const URL = process.env.URL;
console.log("MongoDB URL:", process.env.URL); // Debugging line

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET

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
  shortDescription: { type: String, required: true }, // Short description for header
  description: { type: String, required: true }, // Full description for About section
  image: { type: String, required: true },
  genre: { type: String },
  platform: { type: String },
  releaseDate: { type: String },
  developer: { type: String },
  languages: { type: String },
  rating: { type: String },
  // Game Features (stored as array)
  features: [{ type: String }],
  // System Requirements
  systemRequirements: {
    os: { type: String, default: 'Windows 10/11' },
    memory: { type: String, default: '8 GB RAM' },
    graphics: { type: String, default: 'GTX 1060+' },
    storage: { type: String, default: '50 GB' }
  },
  playLink: { type: String, required: false }, // Download/Play link
  wishlistLink: { type: String, required: false }, // Wishlist link
  trailerLink: { type: String, required: false }, // Trailer/Video link
  createdAt: { type: Date, default: Date.now }
});

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, default: 'Vagabond Studios Team' },
  category: { type: String, default: 'General' },
  featured: { type: Boolean, default: false },
  externalLink: { type: String, required: false }, // External news source link
  socialLinks: {
    twitter: { type: String, required: false },
    facebook: { type: String, required: false },
    linkedin: { type: String, required: false }
  },
  createdAt: { type: Date, default: Date.now }
});

const merchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }, // Add category support
  price: { type: Number, required: true }, // Add price field
  purchaseLink: { type: String, required: false }, // External purchase link
  socialLinks: {
    twitter: { type: String, required: false },
    facebook: { type: String, required: false },
    instagram: { type: String, required: false }
  },
  createdAt: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true }, // Full-Time, Part-Time, etc.
  description: { type: String, required: false },
  image: { type: String, required: false }, // Job image for header background
  requirements: { type: [String], required: false },
  benefits: { type: [String], required: false },
  salary: { type: String, required: false },
  department: { type: String, default: 'Game Development' },
  applyLink: { type: String, required: false }, // Application link
  companyWebsite: { type: String, required: false }, // Company website
  contactEmail: { type: String, required: false }, // Contact email
  createdAt: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  inquiryType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);
const Merch = mongoose.model("Merch", merchSchema);
const Game = mongoose.model("Game", gameSchema);
const News = mongoose.model("News", newsSchema);
const Job = mongoose.model("Job", jobSchema);





// Middleware to verify admin authentication
function verifyAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Extract token from "Bearer TOKEN" format
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Invalid token format.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token. Please login again.' });
    }
    return res.status(400).json({ error: 'Authentication failed.' });
  }
}


// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Check credentials against environment variables
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Generate JWT token with 8 hour expiration
    const token = jwt.sign(
      { 
        role: 'admin',
        username: username,
        iat: Math.floor(Date.now() / 1000)
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '8h' }
    );
    
    return res.json({ 
      success: true,
      token,
      expiresIn: '8h',
      message: 'Login successful'
    });
  }

  // Invalid credentials
  res.status(401).json({ error: 'Invalid username or password' });
});

// Verify token endpoint (to check if user is still authenticated)
app.post('/api/admin/verify', verifyAdmin, (req, res) => {
  res.json({ 
    success: true,
    valid: true,
    user: req.user,
    message: 'Token is valid'
  });
});

// Logout endpoint (optional - mainly for client-side token removal)
app.post('/api/admin/logout', verifyAdmin, (req, res) => {
  res.json({ 
    success: true,
    message: 'Logged out successfully'
  });
});











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

// Get single game by ID
app.get("/api/games/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error("Error fetching game:", err);
    res.status(500).json({ error: "Failed to fetch game" });
  }
});

app.post("/api/games", verifyAdmin, async (req, res) => { // sends data to server (create)
  const { 
    title, 
    shortDescription,
    description, 
    image, 
    genre,
    platform,
    releaseDate,
    developer,
    languages,
    rating,
    features,
    systemRequirements,
    playLink, 
    wishlistLink, 
    trailerLink 
  } = req.body;
  
  if (!title || !shortDescription || !description || !image) {
    return res.status(400).json({ error: "Title, short description, description, and image are required" });
  }
  
  try {
    const gameData = { 
      title, 
      shortDescription,
      description, 
      image,
      features: features || [],
      systemRequirements: systemRequirements || {}
    };

    // Only add fields that have values
    if (genre) gameData.genre = genre;
    if (platform) gameData.platform = platform;
    if (releaseDate) gameData.releaseDate = releaseDate;
    if (developer) gameData.developer = developer;
    if (languages) gameData.languages = languages;
    if (rating) gameData.rating = rating;
    if (playLink) gameData.playLink = playLink;
    if (wishlistLink) gameData.wishlistLink = wishlistLink;
    if (trailerLink) gameData.trailerLink = trailerLink;

    const newGame = new Game(gameData);
    await newGame.save();
    res.json(newGame);
  } catch (err) {
    console.error("Error adding game:", err);
    res.status(500).json({ error: "Failed to add game" });
  }
});

app.delete("/api/games/:id", verifyAdmin, async (req, res) => { // deletes data from server (delete)
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

// Update a game
app.put("/api/games/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      shortDescription,
      description, 
      image, 
      genre,
      platform,
      releaseDate,
      developer,
      languages,
      rating,
      features,
      systemRequirements,
      playLink, 
      wishlistLink, 
      trailerLink 
    } = req.body;

    if (!title || !shortDescription || !description || !image) {
      return res.status(400).json({ error: "Title, short description, description, and image are required" });
    }

    const gameData = { 
      title, 
      shortDescription,
      description, 
      image,
      features: features || [],
      systemRequirements: systemRequirements || {}
    };

    // Only add fields that have values
    if (genre) gameData.genre = genre;
    if (platform) gameData.platform = platform;
    if (releaseDate) gameData.releaseDate = releaseDate;
    if (developer) gameData.developer = developer;
    if (languages) gameData.languages = languages;
    if (rating) gameData.rating = rating;
    if (playLink) gameData.playLink = playLink;
    if (wishlistLink) gameData.wishlistLink = wishlistLink;
    if (trailerLink) gameData.trailerLink = trailerLink;

    const updatedGame = await Game.findByIdAndUpdate(id, gameData, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(updatedGame);
  } catch (err) {
    console.error("Error updating game:", err);
    res.status(500).json({ error: "Failed to update game" });
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

// Get single news article by ID
app.get("/api/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ error: "News article not found" });
    }
    res.json(news);
  } catch (err) {
    console.error("Error fetching news article:", err);
    res.status(500).json({ error: "Failed to fetch news article" });
  }
});

app.post("/api/news", verifyAdmin, async (req, res) => {
  const { title, description, image, externalLink, socialLinks } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newNews = new News({ 
      title, 
      description, 
      image, 
      externalLink,
      socialLinks: socialLinks || {}
    });
    await newNews.save();
    res.json(newNews);
  } catch (err) {
    console.error("Error adding news:", err);
    res.status(500).json({ error: "Failed to add news" });
  }
});

app.delete("/api/news/:id", verifyAdmin, async (req, res) => {
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

// Update a news article
app.put("/api/news/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, externalLink, socialLinks } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const updateData = { 
      title, 
      description, 
      image, 
      externalLink,
      socialLinks: socialLinks || {}
    };

    const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedNews) {
      return res.status(404).json({ error: "News article not found" });
    }
    res.json(updatedNews);
  } catch (err) {
    console.error("Error updating news:", err);
    res.status(500).json({ error: "Failed to update news" });
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

// Fetch a single merch item by ID
app.get("/api/merch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const merch = await Merch.findById(id);
    if (!merch) {
      return res.status(404).json({ error: "Merch item not found" });
    }
    res.json(merch);
  } catch (err) {
    console.error("Error fetching merch item:", err);
    res.status(500).json({ error: "Failed to fetch merch item" });
  }
});

// Add a new merch item
app.post("/api/merch", verifyAdmin, async (req, res) => {
  const { title, description, image, category, price, purchaseLink, socialLinks } = req.body;
  if (!title || !description || !image || !category || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newMerch = new Merch({ 
      title, 
      description, 
      image, 
      category, 
      price, 
      purchaseLink,
      socialLinks: socialLinks || {}
    });
    await newMerch.save();
    res.json(newMerch);
  } catch (err) {
    console.error("Error adding merch:", err);
    res.status(500).json({ error: "Failed to add merch" });
  }
});

// Delete a merch item
app.delete("/api/merch/:id", verifyAdmin, async (req, res) => {
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

// Update a merch item
app.put("/api/merch/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, category, price, purchaseLink, socialLinks } = req.body;
    if (!title || !description || !image || !category || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const updateData = { 
      title, 
      description, 
      image, 
      category, 
      price, 
      purchaseLink,
      socialLinks: socialLinks || {}
    };

    const updatedMerch = await Merch.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedMerch) {
      return res.status(404).json({ error: "Merch item not found" });
    }
    res.json(updatedMerch);
  } catch (err) {
    console.error("Error updating merch:", err);
    res.status(500).json({ error: "Failed to update merch" });
  }
});




// POST /api/jobs - Create a new job
app.post("/api/jobs", verifyAdmin, async (req, res) => {
  const { title, location, type, description, image, applyLink, companyWebsite, contactEmail, salary, department } = req.body;
  if (!title || !location || !type) {
    return res.status(400).json({ error: "All fields (title, location, type) are required" });
  }

  try {
    // Create job data object with conditional fields
    const jobData = { 
      title, 
      location, 
      type 
    };
    
    // Add optional fields only if they are provided
    if (description) jobData.description = description;
    if (image) jobData.image = image;
    if (applyLink) jobData.applyLink = applyLink;
    if (companyWebsite) jobData.companyWebsite = companyWebsite;
    if (contactEmail) jobData.contactEmail = contactEmail;
    if (salary) jobData.salary = salary;
    if (department) jobData.department = department;

    const newJob = new Job(jobData);
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

// PUT /api/jobs/:id - Update a job
app.put("/api/jobs/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, location, type, description, image, applyLink, companyWebsite, contactEmail, salary, department } = req.body;

  try {
    // Create update data object with conditional fields
    const updateData = { 
      title, 
      location, 
      type 
    };
    
    // Add optional fields only if they are provided
    if (description) updateData.description = description;
    if (image) updateData.image = image;
    if (applyLink) updateData.applyLink = applyLink;
    if (companyWebsite) updateData.companyWebsite = companyWebsite;
    if (contactEmail) updateData.contactEmail = contactEmail;
    if (salary) updateData.salary = salary;
    if (department) updateData.department = department;

    const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(updatedJob);
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// GET /api/jobs/:id - Fetch single job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// DELETE /api/jobs/:id - Delete a job by ID
app.delete("/api/jobs/:id", verifyAdmin, async (req, res) => {
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



// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message, inquiryType } = req.body;
  // Validate required fields
  if (!name || !email || !subject || !message || !inquiryType) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    // Create new contact submission
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      inquiryType
    });
    
    // Save to database
    await newContact.save();
    
    // Return success response
    res.status(201).json({ 
      success: true, 
      message: "Contact form submitted successfully",
      contact: newContact
    });
  } catch (err) {
    console.error("Error submitting contact form:", err);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});


app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contact submissions:", err);
    res.status(500).json({ error: "Failed to fetch contact submissions" });
  }
});





app.post("/api/create-checkout-session", async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Merch.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd', // Changed to USD for consistency
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: Math.round(product.price * 100), // Stripe expects amount in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Change this to your success page
      cancel_url: 'http://localhost:3000/',   // Change this to your cancel page
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Cart checkout session
app.post("/api/create-cart-checkout-session", async (req, res) => {
  const { cartItems } = req.body;
  try {
    console.log('Received cart items:', cartItems); // Debug log
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Validate cart items
    for (const item of cartItems) {
      if (!item.title || !item.price || !item.quantity) {
        console.error('Invalid cart item:', item);
        return res.status(400).json({ error: `Invalid cart item: missing required fields` });
      }
      if (typeof item.price !== 'number' || item.price <= 0) {
        return res.status(400).json({ error: `Invalid price for item: ${item.title}` });
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        return res.status(400).json({ error: `Invalid quantity for item: ${item.title}` });
      }
    }

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd', // Changed to USD as MAD might not be supported
        product_data: {
          name: item.title,
          description: item.description || '',
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    console.log('Creating Stripe session with line items:', lineItems); // Debug log

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/merch',
    });

    console.log('Stripe session created successfully:', session.id); // Debug log
    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe cart checkout error:", err);
    res.status(500).json({ error: `Failed to create cart checkout session: ${err.message}` });
  }
});

app.get('/api/dashboard', verifyAdmin, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

// Additional route for wishlist functionality (without /api prefix)
app.get('/merch/:id', async (req, res) => {
  try {
    const merch = await Merch.findById(req.params.id);
    if (!merch) {
      return res.status(404).json({ message: 'Merchandise not found' });
    }
    res.json(merch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});