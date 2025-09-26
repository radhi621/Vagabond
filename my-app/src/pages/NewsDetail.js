import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch current article
        fetch(`http://localhost:5000/api/news/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Article not found');
                }
                return response.json();
            })
            .then((data) => {
                setArticle(data);
                
                // Fetch related news (all news except current article)
                return fetch('http://localhost:5000/api/news');
            })
            .then((response) => response.json())
            .then((allNews) => {
                // Filter out current article and limit to 4 most recent related articles
                const related = allNews
                    .filter(news => news._id !== id)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 4);
                setRelatedNews(related);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching article:", error);
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
                        <p className="mt-3">Loading article...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !article) {
        return (
            <>
                <Navbar />
                <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h2 className="text-danger mb-3">Article Not Found</h2>
                        <p className="mb-4">The article you're looking for doesn't exist or has been removed.</p>
                        <button 
                            className="btn btn-danger px-4"
                            onClick={() => navigate('/news')}
                        >
                            Back to News
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const publishDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <Navbar />
            <div className="bg-black text-white">
                {/* Article Header */}
                <div className="container-fluid position-relative">
                    <div className="row">
                        <div className="col p-0">
                            <img
                                src={article.image || "/images/carditem.jpg"}
                                alt={article.title}
                                className="img-fluid w-100"
                                style={{
                                    height: "50vh",
                                    objectFit: "cover",
                                    display: "block",
                                    position: "relative",
                                    zIndex: 1
                                }}
                                onError={(e) => {
                                    e.target.src = "/images/carditem.jpg";
                                }}
                            />
                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{background: 'rgba(0, 0, 0, 0.4)'}}>
                                <div className="container">
                                    <button 
                                        className="btn btn-outline-light mb-3"
                                        onClick={() => navigate('/news')}
                                    >
                                        ← Back to News
                                    </button>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                            <h1 className="display-5 fw-bold text-white mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>{article.title}</h1>
                                            <p className="text-light opacity-90 mb-2" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Published on {publishDate}</p>
                                            <p className="text-light opacity-90" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>By Vagabond Studios Team</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <article className="bg-dark border-secondary rounded p-4 mb-5 shadow-lg">
                                <div className="mb-4">
                                    <div className="border-start border-danger border-3 ps-3 mb-3">
                                        <p className="text-light fs-5 lh-lg mb-0">{article.description}</p>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <div className="bg-black border-secondary rounded p-3 h-100">
                                            <h4 className="text-white mb-3">
                                                <i className="bi bi-newspaper text-danger me-2"></i>
                                                Latest Updates
                                            </h4>
                                            <p className="text-light">
                                                Our team has been working tirelessly to bring you the latest developments in gaming. 
                                                This news piece represents our ongoing commitment to keeping the community informed 
                                                about our projects and the gaming industry as a whole.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="bg-black border-secondary rounded p-3 h-100">
                                            <h4 className="text-white mb-3">
                                                <i className="bi bi-people text-danger me-2"></i>
                                                What This Means for Players
                                            </h4>
                                            <p className="text-light">
                                                This development will have significant implications for our gaming community. 
                                                We're excited to share these updates and look forward to your feedback and engagement.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags Section */}
                                <div className="mb-4">
                                    <div className="d-flex flex-wrap gap-2">
                                        <span className="badge bg-danger px-3 py-2">Gaming News</span>
                                        <span className="badge bg-outline-secondary px-3 py-2" style={{backgroundColor: 'transparent', border: '1px solid #6c757d'}}>Vagabond Studios</span>
                                        <span className="badge bg-outline-secondary px-3 py-2" style={{backgroundColor: 'transparent', border: '1px solid #6c757d'}}>Updates</span>
                                    </div>
                                </div>

                                <div className="border-top border-secondary pt-4 mt-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center mb-3">
                                                <i className="bi bi-share text-danger me-2"></i>
                                                <p className="text-muted mb-0">Share this article:</p>
                                            </div>
                                            {article.externalLink && (
                                                <a 
                                                    href={article.externalLink} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-danger btn-sm"
                                                >
                                                    <i className="bi bi-link-45deg me-1"></i>
                                                    Read Original Source
                                                </a>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex gap-2 justify-content-md-end flex-wrap">
                                                {article.socialLinks?.twitter ? (
                                                    <a 
                                                        href={article.socialLinks.twitter} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-light btn-sm"
                                                    >
                                                        <i className="bi bi-twitter me-1"></i>
                                                        Twitter
                                                    </a>
                                                ) : (
                                                    <a 
                                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-light btn-sm"
                                                    >
                                                        <i className="bi bi-twitter me-1"></i>
                                                        Twitter
                                                    </a>
                                                )}
                                                
                                                {article.socialLinks?.facebook ? (
                                                    <a 
                                                        href={article.socialLinks.facebook} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-light btn-sm"
                                                    >
                                                        <i className="bi bi-facebook me-1"></i>
                                                        Facebook
                                                    </a>
                                                ) : (
                                                    <a 
                                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-light btn-sm"
                                                    >
                                                        <i className="bi bi-facebook me-1"></i>
                                                        Facebook
                                                    </a>
                                                )}
                                                
                                                {article.socialLinks?.linkedin ? (
                                                    <a 
                                                        href={article.socialLinks.linkedin} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-light btn-sm"
                                                    >
                                                        <i className="bi bi-linkedin me-1"></i>
                                                        LinkedIn
                                                    </a>
                                                ) : (
                                                    <a 
                                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-outline-light btn-sm"
                                                    >
                                                        <i className="bi bi-linkedin me-1"></i>
                                                        LinkedIn
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Related News Section */}
                            {relatedNews.length > 0 && (
                                <div className="bg-dark border-secondary rounded p-4 shadow-lg">
                                    <div className="d-flex align-items-center mb-4">
                                        <i className="bi bi-newspaper text-danger fs-4 me-2"></i>
                                        <h4 className="text-white mb-0">Related News</h4>
                                    </div>
                                    <div className="row g-3">
                                        {relatedNews.map((news) => (
                                            <div className="col-md-6" key={news._id}>
                                                <div className="card bg-black border-secondary h-100 shadow"
                                                     style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
                                                     onMouseEnter={(e) => {
                                                         e.currentTarget.style.transform = 'translateY(-5px)';
                                                         e.currentTarget.style.boxShadow = '0 8px 25px rgba(220, 53, 69, 0.3)';
                                                     }}
                                                     onMouseLeave={(e) => {
                                                         e.currentTarget.style.transform = 'translateY(0)';
                                                         e.currentTarget.style.boxShadow = '';
                                                     }}
                                                     onClick={() => navigate(`/news/${news._id}`)}>
                                                    <div className="position-relative">
                                                        <img 
                                                            src={news.image || "/images/carditem.jpg"} 
                                                            className="card-img-top" 
                                                            style={{ height: "150px", objectFit: "cover" }}
                                                            alt={news.title}
                                                            onError={(e) => {
                                                                e.target.src = "/images/carditem.jpg";
                                                            }}
                                                        />
                                                        <div className="position-absolute top-0 end-0 m-2">
                                                            <span className="badge bg-danger">
                                                                {new Date(news.createdAt).toLocaleDateString('en-US', { 
                                                                    month: 'short', 
                                                                    day: 'numeric' 
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="card-body p-3">
                                                        <h6 className="text-white mb-2 fw-bold">{news.title}</h6>
                                                        <p className="text-muted small mb-3">
                                                            {news.description && news.description.length > 80 
                                                                ? `${news.description.substring(0, 80)}...` 
                                                                : news.description}
                                                        </p>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <small className="text-muted">
                                                                <i className="bi bi-clock me-1"></i>
                                                                {new Date(news.createdAt).toLocaleDateString()}
                                                            </small>
                                                            <button className="btn btn-outline-danger btn-sm">
                                                                <i className="bi bi-arrow-right me-1"></i>
                                                                Read More
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
