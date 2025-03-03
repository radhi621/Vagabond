import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(""); // For merch
  const [price, setPrice] = useState(""); // For merch
  const [selectedPage, setSelectedPage] = useState("games");

  useEffect(() => {
    fetch(`http://localhost:5000/api/${selectedPage}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(`Error fetching ${selectedPage}:`, error));
  }, [selectedPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = selectedPage === "merch" ? { title, description, image, category, price } : { title, description, image };

    fetch(`http://localhost:5000/api/${selectedPage}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add item");
        return response.json();
      })
      .then((data) => {
        setItems([...items, data]);
        setTitle("");
        setDescription("");
        setImage("");
        setCategory("");
        setPrice("");
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:5000/api/${selectedPage}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete item");
        return response.json();
      })
      .then(() => {
        setItems(items.filter((item) => item._id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <>
      <Navbar />
      <div className="bg-black text-white p-5">
        <h1>Add New Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Page</label>
            <select
              className="form-control"
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
            >
              <option value="games">Games</option>
              <option value="news">News</option>
              <option value="merch">Merch</option>
            </select>
          </div>

          {/* Show category and price fields only when adding merch */}
          {selectedPage === "merch" && (
            <>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-danger">Add Item</button>
        </form>

        <h2 className="mt-5">Manage {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}</h2>
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-md-6" key={item._id}>
              <div className="card bg-dark text-white h-100">
                <img src={item.image} className="card-img-top" style={{ height: "300px", objectFit: "cover" }} alt={item.title} />
                <div className="card-body bg-dark">
                  <h5 className="card-title fw-bold mb-3">{item.title}</h5>
                  <p className="card-text text-light opacity-75">{item.description}</p>
                  {selectedPage === "merch" && <p className="fw-bold">Category: {item.category} | Price: ${item.price}</p>}
                  <button className="btn btn-danger mt-3" onClick={() => deleteItem(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
