import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const { getTotalItems } = useCart();

    useEffect(() => {
        // Update wishlist count on component mount
        const updateWishlistCount = () => {
            // All wishlists store complete objects, so we can just count the length
            const gameWishlist = JSON.parse(localStorage.getItem('gameWishlist') || '[]');
            const merchWishlist = JSON.parse(localStorage.getItem('merchWishlist') || '[]');
            const jobWishlist = JSON.parse(localStorage.getItem('jobWishlist') || '[]');
            setWishlistCount(gameWishlist.length + merchWishlist.length + jobWishlist.length);
        };

        updateWishlistCount();

        // Listen for localStorage changes (when wishlist is updated)
        window.addEventListener('storage', updateWishlistCount);
        
        // Custom event for when wishlist is updated from same tab
        window.addEventListener('wishlistUpdated', updateWishlistCount);
        window.addEventListener('wishlistChanged', updateWishlistCount);

        return () => {
            window.removeEventListener('storage', updateWishlistCount);
            window.removeEventListener('wishlistUpdated', updateWishlistCount);
            window.removeEventListener('wishlistChanged', updateWishlistCount);
        };
    }, []);

    return (
        <>
        <nav className="navbar navbar-expand-lg bg-black navbar-dark border-bottom sticky-top">
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand" href="/">
                    <img src="/images/logo.png" alt="Logo" height="50" className="ms-3" />
                </a>
                {/* Toggler for Mobile View */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navbar Content */}
                <div className="collapse navbar-collapse text-center" id="navbarNav">
                    {/* Centered Links */}
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link mx-3" href="/Games">GAMES</a>
                        </li>

                        {/* Dropdown for News */}
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle mx-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            NEWS
                        </a>
                        <ul className="dropdown-menu bg-black">
                            <li><a className="dropdown-item text-white bg-transparent" href="/news">Our News</a></li>
                            <li><a className="dropdown-item text-white bg-transparent" href="/gamingnews">Gaming News</a></li>
                        </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link mx-3" href="/merch">MERCH</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mx-3" href="/Hiring">WE'RE HIRING</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mx-3" href="/Contact">CONTACT</a>
                        </li>
                    </ul>
                    
                    {/* Cart, Wishlist and Discord Buttons */}
                    <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center mt-3 mt-lg-0">
                        {/* Wishlist Button */}
                        <a 
                            href="/wishlist"
                            className="btn btn-outline-light mb-2 mb-lg-0 me-lg-2 position-relative"
                            title="My Wishlist"
                        >
                            ❤️
                            {wishlistCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {wishlistCount}
                                </span>
                            )}
                        </a>
                        
                        {/* Cart Button */}
                        <button 
                            className="btn btn-outline-light mb-2 mb-lg-0 me-lg-3 position-relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            🛒
                            {getTotalItems() > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>
                        
                        {/* Join Discord Button */}
                        <a 
                        href="https://discord.gg/rYbMKFBh"  
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn bg-danger text-white px-4 py-2 d-inline-flex align-items-center border-0"
                        >
                        <i className="fa-brands fa-discord me-2"></i> JOIN OUR DISCORD
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        
        {/* Cart Component */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
