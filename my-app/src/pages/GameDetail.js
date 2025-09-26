import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function GameDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/games/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Game not found');
                }
                return response.json();
            })
            .then((data) => {
                setGame(data);
                setLoading(false);
                
                // Check if game is in wishlist
                const wishlist = JSON.parse(localStorage.getItem('gameWishlist') || '[]');
                setIsInWishlist(wishlist.some(g => g._id === data._id));
            })
            .catch((error) => {
                console.error("Error fetching game:", error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading game details...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !game) {
        return (
            <>
                <Navbar />
                <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h2 className="text-danger mb-3">Game Not Found</h2>
                        <p className="mb-4">The game you're looking for doesn't exist or has been removed.</p>
                        <button 
                            className="btn btn-danger px-4"
                            onClick={() => navigate('/games')}
                        >
                            Back to Games
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
                <div className="container-fluid position-relative">
                    <div className="row">
                        <div className="col p-0">
                            <img
                                src={game.image}
                                alt={game.title}
                                className="img-fluid w-100"
                                style={{
                                    height: "60vh",
                                    objectFit: "cover",
                                }}
                            />
                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-end">
                                <div className="container p-5">
                                    <button 
                                        className="btn btn-outline-light mb-3"
                                        onClick={() => navigate('/games')}
                                    >
                                        ← Back to Games
                                    </button>
                                    <h1 className="display-4 fw-bold text-white mb-3">{game.title}</h1>
                                    <p className="lead text-light opacity-75">{game.shortDescription || game.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Game Details Section */}
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card bg-dark border-secondary">
                                <div className="card-body p-4">
                                    <h3 className="text-white mb-4">About This Game</h3>
                                    <p className="text-light mb-4">{game.description}</p>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="bg-black p-3 rounded mb-3">
                                                <h5 className="text-danger mb-2">Game Features</h5>
                                                <ul className="text-light list-unstyled">
                                                    {game.features && game.features.length > 0 ? (
                                                        game.features.map((feature, index) => (
                                                            <li key={index}>• {feature}</li>
                                                        ))
                                                    ) : (
                                                        <>
                                                            <li>• Immersive Gameplay</li>
                                                            <li>• Stunning Graphics</li>
                                                            <li>• Engaging Storyline</li>
                                                            <li>• Multiplayer Support</li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="bg-black p-3 rounded mb-3">
                                                <h5 className="text-danger mb-2">System Requirements</h5>
                                                <ul className="text-light list-unstyled">
                                                    <li>• OS: {game.systemRequirements?.os || 'Windows 10/11'}</li>
                                                    <li>• Memory: {game.systemRequirements?.memory || '8 GB RAM'}</li>
                                                    <li>• Graphics: {game.systemRequirements?.graphics || 'GTX 1060+'}</li>
                                                    <li>• Storage: {game.systemRequirements?.storage || '50 GB'}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        {game.playLink ? (
                                            <a 
                                                href={game.playLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn btn-danger btn-lg px-5 me-3"
                                            >
                                                Download Now
                                            </a>
                                        ) : (
                                            <button 
                                                className="btn btn-secondary btn-lg px-5 me-3" 
                                                disabled
                                            >
                                                Coming Soon
                                            </button>
                                        )}
                                        
                                        {game.wishlistLink ? (
                                            <a 
                                                href={game.wishlistLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-light btn-lg px-4 me-3"
                                            >
                                                Add to Wishlist
                                            </a>
                                        ) : (
                                            <button 
                                                className={`btn btn-lg px-4 me-3 ${isInWishlist ? 'btn-success' : 'btn-outline-light'}`}
                                                onClick={() => {
                                                    const wishlist = JSON.parse(localStorage.getItem('gameWishlist') || '[]');
                                                    
                                                    if (!isInWishlist) {
                                                        wishlist.push(game);
                                                        localStorage.setItem('gameWishlist', JSON.stringify(wishlist));
                                                        setIsInWishlist(true);
                                                        // Dispatch event to update navbar counter
                                                        window.dispatchEvent(new Event('wishlistChanged'));
                                                        alert('Game added to wishlist!');
                                                    } else {
                                                        const updatedWishlist = wishlist.filter(g => g._id !== game._id);
                                                        localStorage.setItem('gameWishlist', JSON.stringify(updatedWishlist));
                                                        setIsInWishlist(false);
                                                        // Dispatch event to update navbar counter
                                                        window.dispatchEvent(new Event('wishlistChanged'));
                                                        alert('Game removed from wishlist!');
                                                    }
                                                }}
                                            >
                                                {isInWishlist ? '✓ In Wishlist' : 'Add to Wishlist'}
                                            </button>
                                        )}

                                        {game.trailerLink && (
                                            <a 
                                                href={game.trailerLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-danger btn-lg px-4"
                                            >
                                                Watch Trailer
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4">
                            <div className="card bg-dark border-secondary">
                                <div className="card-body p-4">
                                    <h5 className="text-white mb-3">Game Information</h5>
                                    {game.developer && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Developer: </span>
                                            <span className="text-white">{game.developer}</span>
                                        </div>
                                    )}
                                    {game.releaseDate && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Release Date: </span>
                                            <span className="text-white">{game.releaseDate}</span>
                                        </div>
                                    )}
                                    {game.genre && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Genre: </span>
                                            <span className="text-white">{game.genre}</span>
                                        </div>
                                    )}
                                    {game.platform && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Platform: </span>
                                            <span className="text-white">{game.platform}</span>
                                        </div>
                                    )}
                                    {game.systemRequirements?.storage && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">File Size: </span>
                                            <span className="text-white">{game.systemRequirements.storage}</span>
                                        </div>
                                    )}
                                    {game.languages && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Languages: </span>
                                            <span className="text-white">{game.languages}</span>
                                        </div>
                                    )}
                                    {game.rating && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Rating: </span>
                                            <span className="text-white">{game.rating}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="card bg-dark border-secondary mt-4">
                                <div className="card-body p-4">
                                    <h5 className="text-white mb-3">Share This Game</h5>
                                    <div className="d-flex gap-2">
                                        <a 
                                            href={`https://twitter.com/intent/tweet?text=Check%20out%20${encodeURIComponent(game.title)}%20by%20Vagabond%20Studios!%20${encodeURIComponent(game.shortDescription || game.description)}&url=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-light btn-sm flex-fill"
                                        >
                                            Twitter
                                        </a>
                                        <a 
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(game.title)}&description=${encodeURIComponent(game.shortDescription || game.description)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-light btn-sm flex-fill"
                                        >
                                            Facebook
                                        </a>
                                        <button 
                                            onClick={() => {
                                                const shareText = `Check out ${game.title} by Vagabond Studios! ${window.location.href}`;
                                                navigator.clipboard.writeText(shareText).then(() => {
                                                    alert('Game link copied to clipboard!');
                                                });
                                            }}
                                            className="btn btn-outline-light btn-sm flex-fill"
                                        >
                                            Copy Link
                                        </button>
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
