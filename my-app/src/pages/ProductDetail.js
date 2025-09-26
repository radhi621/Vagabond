import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { productId, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageHeight, setImageHeight] = useState(window.innerWidth <= 576 ? "70vh" : "50vh");
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const { addToCart, getItemQuantity } = useCart();

  // Use either productId or id parameter
  const itemId = productId || id;

  useEffect(() => {
    fetch(`http://localhost:5000/api/merch/${itemId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
        
        // Check if product is in wishlist
        const wishlist = JSON.parse(localStorage.getItem('merchWishlist') || '[]');
        setIsInWishlist(wishlist.some(p => p._id === data._id));
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId]);

  const handleBuyNow = async () => {
    if (product.purchaseLink) {
      window.open(product.purchaseLink, '_blank');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('merchWishlist') || '[]');
    
    if (!isInWishlist) {
      wishlist.push(product);
      localStorage.setItem('merchWishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
      // Dispatch event to update navbar counter
      window.dispatchEvent(new Event('wishlistChanged'));
      alert('Product added to wishlist!');
    } else {
      const updatedWishlist = wishlist.filter(p => p._id !== product._id);
      localStorage.setItem('merchWishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      // Dispatch event to update navbar counter
      window.dispatchEvent(new Event('wishlistChanged'));
      alert('Product removed from wishlist!');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-danger mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4>Loading product...</h4>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h2>Product not found</h2>
            <button 
              className="btn btn-danger mt-3"
              onClick={() => navigate('/merch')}
            >
              Back to Merch
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-black text-white">
        {/* Hero Section */}
        <div className="container-fluid" style={{ padding: 0 }}>
          <div className="row">
            <div className="col" style={{ padding: 0 }}>
              <img
                src="/images/carditem.jpg"
                alt="Product"
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: imageHeight,
                }}
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col">
              <button 
                className="btn btn-outline-light mb-3"
                onClick={() => navigate('/merch')}
              >
                ← Back to Merch
              </button>
            </div>
          </div>

          <div className="row">
            {/* Product Image */}
            <div className="col-lg-6 mb-4">
              <div className="position-relative">
                <img
                  src={product.image}
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "500px", objectFit: "cover" }}
                  alt={product.title}
                />
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-danger fs-6 px-3 py-2">{product.category}</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-6">
              <div className="h-100 d-flex flex-column">
                <h1 className="display-4 fw-bold mb-3">{product.title}</h1>
                
                <div className="mb-4">
                  <span className="badge bg-secondary me-2">Category</span>
                  <span className="text-light">{product.category}</span>
                </div>

                <div className="mb-4">
                  <h3 className="text-danger mb-3">{product.price} USD</h3>
                  {getItemQuantity(product._id) > 0 && (
                    <div className="alert alert-success">
                      <i className="bi bi-check-circle me-2"></i>
                      {getItemQuantity(product._id)} item(s) in your cart
                    </div>
                  )}
                </div>

                <div className="mb-4 flex-grow-1">
                  <h4 className="mb-3">Description</h4>
                  <p className="lead text-light">{product.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto">
                  <div className="d-grid gap-3">
                    <button
                      className="btn btn-outline-danger btn-lg"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-danger btn-lg"
                      onClick={handleBuyNow}
                    >
                      <i className="bi bi-lightning me-2"></i>
                      {product.purchaseLink ? 'Buy on External Store' : 'Buy Now'}
                    </button>
                    <button
                      className={`btn btn-lg ${isInWishlist ? 'btn-success' : 'btn-outline-light'}`}
                      onClick={toggleWishlist}
                    >
                      <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                      {isInWishlist ? '✓ In Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Product Info */}
          <div className="row mt-5">
            <div className="col-lg-8">
              <div className="card bg-dark border-secondary">
                <div className="card-header bg-danger text-white">
                  <h4 className="mb-0">Product Information</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="text-danger">Category</h6>
                      <p className="text-light mb-3">{product.category}</p>
                      
                      <h6 className="text-danger">Price</h6>
                      <p className="text-light mb-3">{product.price} USD</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-danger">Availability</h6>
                      <p className="text-success mb-3">In Stock</p>
                      
                      <h6 className="text-danger">Shipping</h6>
                      <p className="text-light mb-3">Free shipping on orders over 200 USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card bg-dark border-secondary">
                <div className="card-body p-4">
                  <h5 className="text-white mb-3">Share This Product</h5>
                  <div className="d-grid gap-2">
                    {product.socialLinks?.twitter ? (
                      <a 
                        href={product.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm"
                      >
                        <i className="bi bi-twitter me-2"></i>Twitter
                      </a>
                    ) : (
                      <a 
                        href={`https://twitter.com/intent/tweet?text=Check%20out%20${encodeURIComponent(product.title)}%20from%20Vagabond%20Studios!&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm"
                      >
                        <i className="bi bi-twitter me-2"></i>Twitter
                      </a>
                    )}
                    
                    {product.socialLinks?.facebook ? (
                      <a 
                        href={product.socialLinks.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm"
                      >
                        <i className="bi bi-facebook me-2"></i>Facebook
                      </a>
                    ) : (
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm"
                      >
                        <i className="bi bi-facebook me-2"></i>Facebook
                      </a>
                    )}
                    
                    {product.socialLinks?.instagram ? (
                      <a 
                        href={product.socialLinks.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm"
                      >
                        <i className="bi bi-instagram me-2"></i>Instagram
                      </a>
                    ) : (
                      <button 
                        onClick={() => {
                          const shareText = `Check out ${product.title} from Vagabond Studios! ${window.location.href}`;
                          navigator.clipboard.writeText(shareText).then(() => {
                            alert('Product link copied to clipboard!');
                          });
                        }}
                        className="btn btn-outline-light btn-sm"
                      >
                        <i className="bi bi-link-45deg me-2"></i>Copy Link
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
