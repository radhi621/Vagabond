import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { getToken, removeToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(""); // For merch
  const [price, setPrice] = useState(""); // For merch
  const [position, setPosition] = useState(""); // Job-specific field
  const [location, setLocation] = useState(""); // Job-specific field
  const [salary, setSalary] = useState(""); // Job-specific field
  const [selectedPage, setSelectedPage] = useState("games");
  const [stats, setStats] = useState({ games: 0, news: 0, merch: 0, jobs: 0 });

  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  // Link fields for games
  const [playLink, setPlayLink] = useState("");
  const [wishlistLink, setWishlistLink] = useState("");
  const [trailerLink, setTrailerLink] = useState("");

  // Game-specific information fields
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [developer, setDeveloper] = useState("");
  const [languages, setLanguages] = useState("");
  const [rating, setRating] = useState("");
  const [features, setFeatures] = useState("");
  const [systemReqOS, setSystemReqOS] = useState("");
  const [systemReqMemory, setSystemReqMemory] = useState("");
  const [systemReqGraphics, setSystemReqGraphics] = useState("");
  const [systemReqStorage, setSystemReqStorage] = useState("");

  // Link fields for news
  const [externalLink, setExternalLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");

  // Link fields for jobs
  const [applyLink, setApplyLink] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Link fields for merch
  const [purchaseLink, setPurchaseLink] = useState("");
  const [merchTwitterLink, setMerchTwitterLink] = useState("");
  const [merchFacebookLink, setMerchFacebookLink] = useState("");
  const [merchInstagramLink, setMerchInstagramLink] = useState("");

  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token || ''
    };
  };

  // Function to clear all form fields
  const clearForm = () => {
    setTitle("");
    setShortDescription("");
    setDescription("");
    setImage("");
    setCategory("");
    setPrice("");
    setPosition("");
    setLocation("");
    setSalary("");
    setPlayLink("");
    setWishlistLink("");
    setTrailerLink("");
    setGenre("");
    setPlatform("");
    setReleaseDate("");
    setDeveloper("");
    setLanguages("");
    setRating("");
    setFeatures("");
    setSystemReqOS("");
    setSystemReqMemory("");
    setSystemReqGraphics("");
    setSystemReqStorage("");
    setExternalLink("");
    setTwitterLink("");
    setFacebookLink("");
    setLinkedinLink("");
    setApplyLink("");
    setCompanyWebsite("");
    setContactEmail("");
    setPurchaseLink("");
    setMerchTwitterLink("");
    setMerchFacebookLink("");
    setMerchInstagramLink("");
    setIsEditMode(false);
    setEditingItemId(null);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/${selectedPage}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(`Error fetching ${selectedPage}:`, error));
    
    // Clear form when switching pages
    clearForm();
  }, [selectedPage]);

  // Fetch stats for all categories
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const categories = ['games', 'news', 'merch', 'jobs'];
        const statsData = {};
        
        for (const category of categories) {
          const response = await fetch(`http://localhost:5000/api/${category}`);
          const data = await response.json();
          statsData[category] = data.length;
        }
        
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [items]); // Refetch stats when items change





useEffect(() => {
  const token = getToken();
  
  if (!token) {
    setIsLoading(false);
    navigate('/admin-login');
    return;
  }

  // Verify token with server
  fetch("http://localhost:5000/api/admin/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      return res.json();
    })
    .then(() => {
      setAuthorized(true);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Authentication failed:", error);
      removeToken();
      setIsLoading(false);
      navigate('/admin-login');
    });
}, [navigate]);

if (isLoading) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#000' }}>
      <div className="text-white">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Verifying authentication...</p>
      </div>
    </div>
  );
}

if (!authorized) return null;

  // Function to populate form with item data for editing
  const handleEdit = (item) => {
    setIsEditMode(true);
    setEditingItemId(item._id);
    setTitle(item.title || "");
    setDescription(item.description || "");
    setImage(item.image || "");

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (selectedPage === "games") {
      setShortDescription(item.shortDescription || "");
      setGenre(item.genre || "");
      setPlatform(item.platform || "");
      setReleaseDate(item.releaseDate || "");
      setDeveloper(item.developer || "");
      setLanguages(item.languages || "");
      setRating(item.rating || "");
      setFeatures(item.features ? item.features.join(', ') : "");
      setPlayLink(item.playLink || "");
      setWishlistLink(item.wishlistLink || "");
      setTrailerLink(item.trailerLink || "");
      setSystemReqOS(item.systemRequirements?.os || "");
      setSystemReqMemory(item.systemRequirements?.memory || "");
      setSystemReqGraphics(item.systemRequirements?.graphics || "");
      setSystemReqStorage(item.systemRequirements?.storage || "");
    } else if (selectedPage === "merch") {
      setCategory(item.category || "");
      setPrice(item.price || "");
      setPurchaseLink(item.purchaseLink || "");
      setMerchTwitterLink(item.socialLinks?.twitter || "");
      setMerchFacebookLink(item.socialLinks?.facebook || "");
      setMerchInstagramLink(item.socialLinks?.instagram || "");
    } else if (selectedPage === "news") {
      setExternalLink(item.externalLink || "");
      setTwitterLink(item.socialLinks?.twitter || "");
      setFacebookLink(item.socialLinks?.facebook || "");
      setLinkedinLink(item.socialLinks?.linkedin || "");
    } else if (selectedPage === "jobs") {
      setLocation(item.location || "");
      setPosition(item.type || "");
      setApplyLink(item.applyLink || "");
      setCompanyWebsite(item.companyWebsite || "");
      setContactEmail(item.contactEmail || "");
    }
  };

  // Function to cancel edit mode
  const handleCancelEdit = () => {
    clearForm();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let itemData = {};
    
    if (selectedPage === "jobs") {
      itemData = { 
        title, 
        location, 
        type: position, 
        description,
        image,
        applyLink, 
        companyWebsite, 
        contactEmail 
      };
    } else if (selectedPage === "merch") {
      itemData = { 
        title, 
        description, 
        image, 
        category, 
        price, 
        purchaseLink,
        socialLinks: {
          twitter: merchTwitterLink,
          facebook: merchFacebookLink,
          instagram: merchInstagramLink
        }
      };
    } else if (selectedPage === "games") {
      itemData = { 
        title, 
        shortDescription,
        description, 
        image,
        features: features ? features.split(',').map(f => f.trim()).filter(f => f) : [],
        systemRequirements: {}
      };

      // Only add fields that have values
      if (genre) itemData.genre = genre;
      if (platform) itemData.platform = platform;
      if (releaseDate) itemData.releaseDate = releaseDate;
      if (developer) itemData.developer = developer;
      if (languages) itemData.languages = languages;
      if (rating) itemData.rating = rating;
      if (playLink) itemData.playLink = playLink;
      if (wishlistLink) itemData.wishlistLink = wishlistLink;
      if (trailerLink) itemData.trailerLink = trailerLink;
      
      // Only add system requirements that have values
      if (systemReqOS) itemData.systemRequirements.os = systemReqOS;
      if (systemReqMemory) itemData.systemRequirements.memory = systemReqMemory;
      if (systemReqGraphics) itemData.systemRequirements.graphics = systemReqGraphics;
      if (systemReqStorage) itemData.systemRequirements.storage = systemReqStorage;
    } else if (selectedPage === "news") {
      itemData = { 
        title, 
        description, 
        image, 
        externalLink,
        socialLinks: {
          twitter: twitterLink,
          facebook: facebookLink,
          linkedin: linkedinLink
        }
      };
    }

    // Determine if we're updating or creating
    const url = isEditMode 
      ? `http://localhost:5000/api/${selectedPage}/${editingItemId}`
      : `http://localhost:5000/api/${selectedPage}`;
    
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: getAuthHeaders(),
      body: JSON.stringify(itemData),
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          alert("Session expired. Please login again.");
          removeToken();
          navigate('/admin-login');
          throw new Error("Unauthorized");
        }
        if (!response.ok) throw new Error(isEditMode ? "Failed to update item" : "Failed to add item");
        return response.json();
      })
      .then((data) => {
        if (isEditMode) {
          // Update the item in the list
          setItems(items.map(item => item._id === editingItemId ? data : item));
        } else {
          // Add new item to the list
          setItems([...items, data]);
        }
        // Clear form
        clearForm();
      })
      .catch((error) => console.error(isEditMode ? "Error updating item:" : "Error adding item:", error));
  };

  const deleteItem = (id) => {
    console.log("Deleting item with ID:", id);  // Log the ID being passed
    fetch(`http://localhost:5000/api/${selectedPage}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          alert("Session expired. Please login again.");
          removeToken();
          navigate('/admin-login');
          throw new Error("Unauthorized");
        }
        if (!response.ok) throw new Error("Failed to delete item");
        return response.json();
      })
      .then(() => {
        setItems(items.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      removeToken();
      navigate('/admin-login');
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="container d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-4 fw-bold text-white mb-0">Admin Dashboard</h1>
              <p className="text-light opacity-75 mb-0">Manage your game studio content</p>
            </div>
            <button 
              onClick={handleLogout}
              className="btn btn-outline-light d-flex align-items-center gap-2"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="d-none d-md-inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="container py-4">
          {/* Stats Section */}
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-number">{stats.games}</span>
              <span className="stat-label">Games</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.news}</span>
              <span className="stat-label">News Articles</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.merch}</span>
              <span className="stat-label">Merch Items</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.jobs}</span>
              <span className="stat-label">Job Openings</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="dashboard-nav">
            <div className="d-flex flex-wrap justify-content-center">
              {["games", "news", "merch", "jobs"].map((page) => (
                <button
                  key={page}
                  className={`nav-tab ${selectedPage === page ? "active" : ""}`}
                  onClick={() => setSelectedPage(page)}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Add New Item Form */}
          <div className="form-container">
            <h2 className="form-title">
              {isEditMode ? (
                <>
                  <i className="fas fa-edit me-2"></i>
                  Edit {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Item
                </>
              ) : (
                <>
                  <i className="fas fa-plus-circle me-2"></i>
                  Add New {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Item
                </>
              )}
            </h2>
            {isEditMode && (
              <div className="alert alert-info mb-3">
                <i className="fas fa-info-circle me-2"></i>
                You are currently editing an item. Make your changes and click "Update" to save.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter item title"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter image URL"
                  />
                </div>
              </div>

              {/* Short Description for Games only */}
              {selectedPage === "games" && (
                <div className="mb-3">
                  <label className="form-label">Short Description (Header)</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Enter a brief, engaging description for the game header (1-2 sentences)"
                    required
                  ></textarea>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">{selectedPage === "games" ? "Full Description (About Section)" : "Description"}</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={selectedPage === "games" ? "Enter detailed description for the About This Game section" : "Enter item description"}
                ></textarea>
              </div>

              {/* Conditional Fields */}
              {selectedPage === "merch" && (
                <>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g., Clothing, Accessories"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Purchase Link (External Store)</label>
                    <input
                      type="url"
                      className="form-control"
                      value={purchaseLink}
                      onChange={(e) => setPurchaseLink(e.target.value)}
                      placeholder="https://store.example.com/product"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Twitter Share Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={merchTwitterLink}
                        onChange={(e) => setMerchTwitterLink(e.target.value)}
                        placeholder="https://twitter.com/intent/tweet?text=..."
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Facebook Share Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={merchFacebookLink}
                        onChange={(e) => setMerchFacebookLink(e.target.value)}
                        placeholder="https://facebook.com/sharer/sharer.php?u=..."
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Instagram Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={merchInstagramLink}
                        onChange={(e) => setMerchInstagramLink(e.target.value)}
                        placeholder="https://instagram.com/p/..."
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedPage === "jobs" && (
                <>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Remote, New York, London"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Employment Type</label>
                      <select
                        className="form-control"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                      >
                        <option value="">Select type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Apply Link (URL)</label>
                      <input
                        type="url"
                        className="form-control"
                        value={applyLink}
                        onChange={(e) => setApplyLink(e.target.value)}
                        placeholder="https://careers.company.com/apply"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Company Website</label>
                      <input
                        type="url"
                        className="form-control"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        placeholder="https://company.com"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Contact Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="hr@company.com"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Game-specific link fields */}
              {selectedPage === "games" && (
                <>
                  {/* Game Information Fields */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Genre</label>
                      <input
                        type="text"
                        className="form-control"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        placeholder="e.g., Action, Adventure, RPG"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Platform</label>
                      <input
                        type="text"
                        className="form-control"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        placeholder="e.g., PC, PlayStation, Xbox"
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Release Date</label>
                      <input
                        type="text"
                        className="form-control"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        placeholder="e.g., Coming Soon, 2024, Q4 2024"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Developer</label>
                      <input
                        type="text"
                        className="form-control"
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                        placeholder="e.g., Vagabond Studios"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Languages</label>
                      <input
                        type="text"
                        className="form-control"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        placeholder="e.g., English, French, Spanish"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Age Rating</label>
                      <input
                        type="text"
                        className="form-control"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="e.g., Teen (T), Mature (M), Everyone (E)"
                      />
                    </div>
                  </div>

                  {/* Game Features */}
                  <div className="mb-3">
                    <label className="form-label">Game Features (comma-separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                      placeholder="e.g., Immersive Gameplay, Stunning Graphics, Engaging Storyline, Multiplayer Support"
                    />
                  </div>

                  {/* System Requirements */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">System Requirements - OS</label>
                      <input
                        type="text"
                        className="form-control"
                        value={systemReqOS}
                        onChange={(e) => setSystemReqOS(e.target.value)}
                        placeholder="e.g., Windows 10/11"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">System Requirements - Memory</label>
                      <input
                        type="text"
                        className="form-control"
                        value={systemReqMemory}
                        onChange={(e) => setSystemReqMemory(e.target.value)}
                        placeholder="e.g., 8 GB RAM"
                      />
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">System Requirements - Graphics</label>
                      <input
                        type="text"
                        className="form-control"
                        value={systemReqGraphics}
                        onChange={(e) => setSystemReqGraphics(e.target.value)}
                        placeholder="e.g., GTX 1060+"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">System Requirements - Storage</label>
                      <input
                        type="text"
                        className="form-control"
                        value={systemReqStorage}
                        onChange={(e) => setSystemReqStorage(e.target.value)}
                        placeholder="e.g., 50 GB"
                      />
                    </div>
                  </div>

                  {/* Game Links */}
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Play/Download Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={playLink}
                        onChange={(e) => setPlayLink(e.target.value)}
                        placeholder="https://store.steampowered.com/app/..."
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Wishlist Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={wishlistLink}
                        onChange={(e) => setWishlistLink(e.target.value)}
                        placeholder="https://store.steampowered.com/app/..."
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Trailer/Video Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={trailerLink}
                        onChange={(e) => setTrailerLink(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                </>
              )}

              {/* News-specific link fields */}
              {selectedPage === "news" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">External Source Link</label>
                    <input
                      type="url"
                      className="form-control"
                      value={externalLink}
                      onChange={(e) => setExternalLink(e.target.value)}
                      placeholder="https://original-source.com/article"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Twitter Share Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={twitterLink}
                        onChange={(e) => setTwitterLink(e.target.value)}
                        placeholder="https://twitter.com/intent/tweet?text=..."
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Facebook Share Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={facebookLink}
                        onChange={(e) => setFacebookLink(e.target.value)}
                        placeholder="https://facebook.com/sharer/sharer.php?u=..."
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">LinkedIn Share Link</label>
                      <input
                        type="url"
                        className="form-control"
                        value={linkedinLink}
                        onChange={(e) => setLinkedinLink(e.target.value)}
                        placeholder="https://linkedin.com/sharing/share-offsite/?url=..."
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="text-center">
                <button type="submit" className="btn-submit">
                  {isEditMode ? (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Update {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Item
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus me-2"></i>
                      Add {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Item
                    </>
                  )}
                </button>
                {isEditMode && (
                  <button 
                    type="button" 
                    className="btn btn-secondary ms-3"
                    onClick={handleCancelEdit}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Items Management Section */}
          <div className="mb-4">
            <h2 className="section-title">
              Manage {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} ({items.length})
            </h2>
            
            {items.length === 0 ? (
              <div className="text-center py-5">
                <div className="text-white opacity-50">
                  <i className="fas fa-inbox fa-3x mb-3"></i>
                  <h4>No {selectedPage} items yet</h4>
                  <p>Create your first {selectedPage} item using the form above.</p>
                </div>
              </div>
            ) : (
              <div className="items-grid">
                {items.map((item) => (
                  <div className="item-card" key={item._id}>
                    {item.image && (
                      <img src={item.image} className="item-image" alt={item.title} />
                    )}
                    <div className="item-body">
                      <h5 className="item-title">{item.title}</h5>
                      <p className="item-description">{item.description}</p>
                      
                      {/* Item specific metadata */}
                      <div className="item-meta">
                        {selectedPage === "merch" && (
                          <>
                            <span className="meta-badge">{item.category}</span>
                            <span className="meta-badge">${item.price}</span>
                          </>
                        )}
                        {selectedPage === "jobs" && (
                          <>
                            <span className="meta-badge">{item.location}</span>
                            <span className="meta-badge">{item.type}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="d-flex gap-2 mt-3">
                        <button 
                          className="btn btn-primary flex-fill"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="fas fa-edit me-2"></i>
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger flex-fill" 
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
                              deleteItem(item._id);
                            }
                          }}
                        >
                          <i className="fas fa-trash me-2"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
