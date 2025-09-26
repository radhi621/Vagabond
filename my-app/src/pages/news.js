import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function News() {
    const [news, setNews] = useState([]);
    const [imageHeight, setImageHeight] = useState(window.innerWidth <= 576 ? "70vh" : "50vh");

    // Fetch news from the backend
    useEffect(() => {
        fetch("http://localhost:5000/api/news")
            .then((response) => response.json())
            .then((data) => setNews(data))
            .catch((error) => console.error("Error fetching news:", error));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setImageHeight(window.innerWidth <= 576 ? "70vh" : "50vh");
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Navbar />
            <div className="bg-black text-white">
                <div className="container-fluid" style={{ padding: 0 }}>
                    <div className="row">
                        <div className="col" style={{ padding: 0 }}>
                            <img
                                src="/images/carditem.jpg"
                                alt="News"
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
                            <h1>CHECK OUT OUR LATEST NEWS</h1>
                            <div className="border-bottom border-3"></div>
                        </div>
                    </div>
                </div>
                </div>

            {/* Centered News Items */}
            <div className="container-fluid bg-black p-4">
                <div className="row justify-content-center g-4 mb-5"> 
                    {news.map((article) => (
                        <div className="col-lg-8 d-flex justify-content-center" key={article._id}> {/* Center content */}
                            <Link to={`/news/${article._id}`} style={{ textDecoration: "none", width: "100%" }}>
                                <div className="card bg-dark border-0 overflow-hidden w-100 h-100" style={{cursor: 'pointer', transition: 'transform 0.2s'}}
                                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                    <div className="row g-0 h-100">
                                        <div className="col-md-6">
                                            <img src={article.image} className="img-fluid w-100" style={{ height: "300px", objectFit: "cover" }} alt={article.title} />
                                        </div>
                                        <div className="col-md-6 d-flex align-items-center bg-dark">
                                            <div className="card-body p-4">
                                                <h2 className="text-white fw-bold mb-2">{article.title}</h2>
                                                <p className="text-secondary mb-3">
                                                    {article.description && article.description.length > 150 
                                                        ? `${article.description.substring(0, 150)}...` 
                                                        : article.description}
                                                </p>
                                                <span className="btn btn-danger btn-sm">Read More →</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}