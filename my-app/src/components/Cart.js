import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsCheckingOut(true);
    try {
      const response = await fetch('http://localhost:5000/api/create-cart-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: items }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Error processing checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end" 
         style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
      <div className="cart-sidebar bg-dark text-white h-100 overflow-auto" 
           style={{ width: '400px', maxWidth: '90vw' }}>
        
        {/* Cart Header */}
        <div className="cart-header p-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Shopping Cart ({getTotalItems()})</h4>
          <button 
            className="btn btn-outline-light btn-sm"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items flex-grow-1">
          {items.length === 0 ? (
            <div className="text-center p-4">
              <h5>Your cart is empty</h5>
              <p className="text-muted">Add some items to get started!</p>
            </div>
          ) : (
            <div className="p-3">
              {items.map((item) => (
                <div key={item._id} className="cart-item mb-3 p-3 border border-secondary rounded">
                  <div className="d-flex">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="cart-item-image me-3"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="text-muted small mb-2">{item.category}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="quantity-controls d-flex align-items-center">
                          <button 
                            className="btn btn-outline-light btn-sm"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            className="btn btn-outline-light btn-sm"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="me-2">{item.price * item.quantity} USD</span>
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item._id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="cart-footer p-3 border-top border-secondary">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Total: {getTotalPrice()} USD</h5>
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
            <button 
              className="btn btn-danger w-100"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
