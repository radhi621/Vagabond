import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Wishlist() {
    const [wishlistGames, setWishlistGames] = useState([]);
    const [wishlistMerch, setWishlistMerch] = useState([]);
    const [wishlistJobs, setWishlistJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('games');
    const [imageHeight, setImageHeight] = useState(window.innerWidth <= 576 ? "70vh" : "50vh");

    useEffect(() => {
        const loadWishlist = () => {
            try {
                // Load game wishlist (stored as complete objects)
                const games = JSON.parse(localStorage.getItem('gameWishlist') || '[]');
                
                // Load merch wishlist (stored as complete objects)
                const merch = JSON.parse(localStorage.getItem('merchWishlist') || '[]');
                
                // Load job wishlist (stored as complete objects)
                const jobs = JSON.parse(localStorage.getItem('jobWishlist') || '[]');
                
                setWishlistGames(games);
                setWishlistMerch(merch);
                setWishlistJobs(jobs);
                
                console.log('Loaded games from wishlist:', games);
                console.log('Loaded merch from wishlist:', merch);
                console.log('Loaded jobs from wishlist:', jobs);
            } catch (error) {
                console.error('Error loading wishlist:', error);
            } finally {
                setLoading(false);
            }
        };

        loadWishlist();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setImageHeight(window.innerWidth <= 576 ? "70vh" : "50vh");
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const removeFromWishlist = (itemId, type) => {
        if (type === 'game') {
            const currentWishlist = JSON.parse(localStorage.getItem('gameWishlist') || '[]');
            const updatedWishlist = currentWishlist.filter(game => game._id !== itemId);
            localStorage.setItem('gameWishlist', JSON.stringify(updatedWishlist));
            setWishlistGames(prevGames => prevGames.filter(game => game._id !== itemId));
        } else if (type === 'merch') {
            const currentWishlist = JSON.parse(localStorage.getItem('merchWishlist') || '[]');
            const updatedWishlist = currentWishlist.filter(item => item._id !== itemId);
            localStorage.setItem('merchWishlist', JSON.stringify(updatedWishlist));
            setWishlistMerch(prevMerch => prevMerch.filter(item => item._id !== itemId));
        } else if (type === 'job') {
            const currentWishlist = JSON.parse(localStorage.getItem('jobWishlist') || '[]');
            const updatedWishlist = currentWishlist.filter(job => job._id !== itemId);
            localStorage.setItem('jobWishlist', JSON.stringify(updatedWishlist));
            setWishlistJobs(prevJobs => prevJobs.filter(job => job._id !== itemId));
        }
        
        // Trigger custom event for navbar update
        window.dispatchEvent(new Event('wishlistChanged'));
    };

    const clearWishlist = (type) => {
        let confirmMessage;
        if (type === 'games') {
            confirmMessage = 'Are you sure you want to clear all games from your wishlist?';
        } else if (type === 'merch') {
            confirmMessage = 'Are you sure you want to clear all merchandise from your wishlist?';
        } else if (type === 'jobs') {
            confirmMessage = 'Are you sure you want to clear all jobs from your wishlist?';
        }
            
        if (window.confirm(confirmMessage)) {
            if (type === 'games') {
                setWishlistGames([]);
                localStorage.removeItem('gameWishlist');
            } else if (type === 'merch') {
                setWishlistMerch([]);
                localStorage.removeItem('merchWishlist');
            } else if (type === 'jobs') {
                setWishlistJobs([]);
                localStorage.removeItem('jobWishlist');
            }
            
            // Trigger custom event for navbar update
            window.dispatchEvent(new Event('wishlistChanged'));
        }
    };

    const clearAllWishlist = () => {
        if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
            setWishlistGames([]);
            setWishlistMerch([]);
            setWishlistJobs([]);
            localStorage.removeItem('gameWishlist');
            localStorage.removeItem('merchWishlist');
            localStorage.removeItem('jobWishlist');
            
            // Trigger custom event for navbar update
            window.dispatchEvent(new Event('wishlistChanged'));
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-black text-white">
                <div className="container-fluid" style={{ padding: 0 }}>
                    <div className="row">
                        <div className="col" style={{ padding: 0 }}>
                            <img
                                src="/images/carditem.jpg"
                                alt="Wishlist"
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
                <div className="container text-center py-5">
                    <div className="row">
                        <div className="col p-5">
                            <h1>MY WISHLIST</h1>
                            <p className="text-light opacity-75">
                                Keep track of your favorite games and merchandise!
                            </p>
                            <div className="border-bottom border-3"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid bg-black p-4 pb-5">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-white mt-3">Loading your wishlist...</p>
                    </div>
                ) : (
                    <>
                        {/* Tabs */}
                        <div className="mb-4">
                            <ul className="nav nav-tabs nav-fill border-0">
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'games' ? 'active bg-danger text-white' : 'text-white bg-dark'} border-0 mx-1`}
                                        onClick={() => setActiveTab('games')}
                                    >
                                        Games ({wishlistGames.length})
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'merch' ? 'active bg-danger text-white' : 'text-white bg-dark'} border-0 mx-1`}
                                        onClick={() => setActiveTab('merch')}
                                    >
                                        Merchandise ({wishlistMerch.length})
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'jobs' ? 'active bg-danger text-white' : 'text-white bg-dark'} border-0 mx-1`}
                                        onClick={() => setActiveTab('jobs')}
                                    >
                                        Jobs ({wishlistJobs.length})
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="nav-link text-white bg-secondary border-0 mx-1"
                                        onClick={clearAllWishlist}
                                        disabled={wishlistGames.length === 0 && wishlistMerch.length === 0 && wishlistJobs.length === 0}
                                    >
                                        Clear All
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Games Tab */}
                        {activeTab === 'games' && (
                            <>
                                {wishlistGames.length === 0 ? (
                                    <div className="text-center py-5">
                                        <div className="text-white opacity-50">
                                            <i className="fas fa-gamepad fa-3x mb-3"></i>
                                            <h4>No games in your wishlist</h4>
                                            <p className="mb-4">Discover amazing games and add them to your wishlist!</p>
                                            <Link to="/games" className="btn btn-danger btn-lg px-5">
                                                Browse Games
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h3 className="text-white mb-0">
                                                {wishlistGames.length} Game{wishlistGames.length !== 1 ? 's' : ''} in Wishlist
                                            </h3>
                                            <button 
                                                className="btn btn-outline-danger"
                                                onClick={() => clearWishlist('games')}
                                            >
                                                Clear Games
                                            </button>
                                        </div>
                                        
                                        <div className="row g-4">
                                            {wishlistGames.map((game) => (
                                                <div className="col-md-6" key={game._id}>
                                                    <div className="card bg-dark text-white h-100" 
                                                         style={{cursor: 'pointer', transition: 'transform 0.2s'}}
                                                         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                                         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                                        <img
                                                            src={game.image}
                                                            className="card-img-top"
                                                            style={{ height: "250px", objectFit: "cover" }}
                                                            alt={game.title}
                                                        />
                                                        <div className="card-body bg-dark">
                                                            <h5 className="card-title fw-bold mb-3">{game.title}</h5>
                                                            <p className="card-text text-light opacity-75 mb-3">
                                                                {(game.shortDescription || game.description) && (game.shortDescription || game.description).length > 100 
                                                                    ? `${(game.shortDescription || game.description).substring(0, 100)}...` 
                                                                    : (game.shortDescription || game.description)}
                                                            </p>
                                                            
                                                            <div className="d-flex gap-2">
                                                                <Link 
                                                                    to={`/games/${game._id}`} 
                                                                    className="btn btn-danger btn-sm flex-fill"
                                                                >
                                                                    View Details
                                                                </Link>
                                                                {game.playLink && (
                                                                    <a 
                                                                        href={game.playLink} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="btn btn-success btn-sm flex-fill"
                                                                    >
                                                                        Play Now
                                                                    </a>
                                                                )}
                                                                <button 
                                                                    className="btn btn-outline-light btn-sm"
                                                                    onClick={() => removeFromWishlist(game._id, 'game')}
                                                                    title="Remove from wishlist"
                                                                >
                                                                    ❤️
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {/* Merchandise Tab */}
                        {activeTab === 'merch' && (
                            <>
                                {wishlistMerch.length === 0 ? (
                                    <div className="text-center py-5">
                                        <div className="text-white opacity-50">
                                            <i className="fas fa-shopping-bag fa-3x mb-3"></i>
                                            <h4>No merchandise in your wishlist</h4>
                                            <p className="mb-4">Discover cool merchandise and add them to your wishlist!</p>
                                            <Link to="/merch" className="btn btn-danger btn-lg px-5">
                                                Browse Merchandise
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h3 className="text-white mb-0">
                                                {wishlistMerch.length} Item{wishlistMerch.length !== 1 ? 's' : ''} in Wishlist
                                            </h3>
                                            <button 
                                                className="btn btn-outline-danger"
                                                onClick={() => clearWishlist('merch')}
                                            >
                                                Clear Merchandise
                                            </button>
                                        </div>
                                        
                                        <div className="row g-4">
                                            {wishlistMerch.map((item) => (
                                                <div className="col-md-6 col-lg-4" key={item._id}>
                                                    <div className="card bg-dark text-white h-100" 
                                                         style={{cursor: 'pointer', transition: 'transform 0.2s'}}
                                                         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                                         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                                        <img
                                                            src={item.image}
                                                            className="card-img-top"
                                                            style={{ height: "250px", objectFit: "cover" }}
                                                            alt={item.title}
                                                        />
                                                        <div className="card-body bg-dark">
                                                            <h5 className="card-title fw-bold mb-2">{item.title}</h5>
                                                            <p className="text-success fw-bold mb-2">${item.price}</p>
                                                            <p className="card-text text-light opacity-75 mb-3">
                                                                {item.description && item.description.length > 80 
                                                                    ? `${item.description.substring(0, 80)}...` 
                                                                    : item.description}
                                                            </p>
                                                            
                                                            <div className="d-flex gap-2">
                                                                <Link 
                                                                    to={`/merch/${item._id}`} 
                                                                    className="btn btn-danger btn-sm flex-fill"
                                                                >
                                                                    View Details
                                                                </Link>
                                                                {item.purchaseLink && (
                                                                    <a 
                                                                        href={item.purchaseLink} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="btn btn-success btn-sm flex-fill"
                                                                    >
                                                                        Buy Now
                                                                    </a>
                                                                )}
                                                                <button 
                                                                    className="btn btn-outline-light btn-sm"
                                                                    onClick={() => removeFromWishlist(item._id, 'merch')}
                                                                    title="Remove from wishlist"
                                                                >
                                                                    ❤️
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {/* Jobs Tab */}
                        {activeTab === 'jobs' && (
                            <>
                                {wishlistJobs.length === 0 ? (
                                    <div className="text-center py-5">
                                        <div className="text-white opacity-50">
                                            <i className="fas fa-briefcase fa-3x mb-3"></i>
                                            <h4>No jobs in your wishlist</h4>
                                            <p className="mb-4">Save interesting job opportunities to apply later!</p>
                                            <Link to="/hiring" className="btn btn-danger btn-lg px-5">
                                                Browse Jobs
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h3 className="text-white mb-0">
                                                {wishlistJobs.length} Job{wishlistJobs.length !== 1 ? 's' : ''} in Wishlist
                                            </h3>
                                            <button 
                                                className="btn btn-outline-danger"
                                                onClick={() => clearWishlist('jobs')}
                                            >
                                                Clear Jobs
                                            </button>
                                        </div>
                                        
                                        <div className="row g-4">
                                            {wishlistJobs.map((job) => (
                                                <div className="col-lg-6" key={job._id}>
                                                    <div className="card bg-dark text-white h-100 border-secondary" 
                                                         style={{cursor: 'pointer', transition: 'transform 0.2s'}}
                                                         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                                         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                                        <div className="card-body p-4">
                                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                                <h5 className="card-title fw-bold mb-0">{job.title}</h5>
                                                                <button 
                                                                    className="btn btn-outline-light btn-sm ms-2"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeFromWishlist(job._id, 'job');
                                                                    }}
                                                                    title="Remove from wishlist"
                                                                >
                                                                    ❤️
                                                                </button>
                                                            </div>
                                                            
                                                            <div className="d-flex gap-2 mb-3">
                                                                <span className="badge bg-danger">{job.type}</span>
                                                                <span className="badge bg-outline-secondary" style={{backgroundColor: 'transparent', border: '1px solid #6c757d'}}>
                                                                    {job.location}
                                                                </span>
                                                            </div>
                                                            
                                                            <p className="card-text text-light opacity-75 mb-4">
                                                                {job.description && job.description.length > 150 
                                                                    ? `${job.description.substring(0, 150)}...` 
                                                                    : job.description || `Join our team as a ${job.title} at Vagabond Studios. Great opportunity to work on exciting gaming projects.`}
                                                            </p>
                                                            
                                                            <div className="border-top border-secondary pt-3">
                                                                <div className="row">
                                                                    <div className="col-sm-6 mb-2">
                                                                        <small className="text-muted d-block">Position</small>
                                                                        <span className="text-white small">{job.title}</span>
                                                                    </div>
                                                                    <div className="col-sm-6 mb-2">
                                                                        <small className="text-muted d-block">Type</small>
                                                                        <span className="text-white small">{job.type}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="d-flex gap-2 mt-3">
                                                                <Link 
                                                                    to={`/jobs/${job._id}`} 
                                                                    className="btn btn-danger btn-sm flex-fill"
                                                                >
                                                                    View Details
                                                                </Link>
                                                                {job.applyLink ? (
                                                                    <a 
                                                                        href={job.applyLink} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="btn btn-success btn-sm flex-fill"
                                                                    >
                                                                        Apply Now
                                                                    </a>
                                                                ) : job.contactEmail ? (
                                                                    <a 
                                                                        href={`mailto:${job.contactEmail}?subject=Application for ${job.title}`}
                                                                        className="btn btn-success btn-sm flex-fill"
                                                                    >
                                                                        Apply
                                                                    </a>
                                                                ) : (
                                                                    <button className="btn btn-outline-success btn-sm flex-fill" disabled>
                                                                        Contact HR
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}
