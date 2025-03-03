import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Merch() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/merch")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = ["All", ...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching merch:", error));
  }, []);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white">
        <div className="container-fluid p-0">
          <div className="position-relative">
            <img
              src="/images/carditem.jpg"
              alt="Games"
              className="img-fluid w-100"
              style={{ height: "50vh", objectFit: "cover", filter: "brightness(0.7)" }}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center">
              <h1 className="display-4 fw-bold text-uppercase">Merchandise</h1>
              <p className="lead">Express your passion with our exclusive collection</p>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <h2 className="text-center mb-4">CHECK OUT OUR MERCH</h2>
          <div className="border-bottom border-danger border-3 w-50 mx-auto mb-5"></div>
          
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card bg-dark border-danger h-100">
                <div className="card-header bg-danger text-white">
                  <h4 className="mb-0">Categories</h4>
                </div>
                <div className="card-body p-0">
                  <div className="list-group list-group-flush rounded-0">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        className={`list-group-item list-group-item-action ${
                          selectedCategory === category 
                            ? "active bg-danger text-white border-danger" 
                            : "bg-dark text-white border-secondary"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-9">
              <div className="row g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                      <div className="card bg-dark text-white h-100 border-secondary hover-shadow transition">
                        <div className="position-relative">
                          <img
                            src={product.image}
                            className="card-img-top"
                            style={{ height: "300px", objectFit: "cover" }}
                            alt={product.title}
                          />
                          <div className="position-absolute top-0 end-0 m-2">
                            <span className="badge bg-danger">{product.category}</span>
                          </div>
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title fw-bold">{product.title}</h5>
                          <p className="card-text flex-grow-1">{product.description}</p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <p className="fw-bold fs-5 mb-0">${product.price}</p>
                            <button className="btn btn-danger">
                              <i className="bi bi-cart-plus me-2"></i>Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h3>No products found in this category</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}