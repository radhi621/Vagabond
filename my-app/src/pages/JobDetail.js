import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/jobs/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Job not found');
                }
                return response.json();
            })
            .then((data) => {
                setJob(data);
                
                // Check if job is already in wishlist
                const jobWishlist = JSON.parse(localStorage.getItem('jobWishlist') || '[]');
                const isAlreadySaved = jobWishlist.find(j => j._id === data._id);
                setIsSaved(!!isAlreadySaved);
                
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching job:", error);
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
                        <p className="mt-3">Loading job details...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !job) {
        return (
            <>
                <Navbar />
                <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h2 className="text-danger mb-3">Job Not Found</h2>
                        <p className="mb-4">The job posting you're looking for doesn't exist or has been removed.</p>
                        <button 
                            className="btn btn-danger px-4"
                            onClick={() => navigate('/hiring')}
                        >
                            Back to Jobs
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
                {/* Job Header */}
                <div className="container-fluid position-relative">
                    <div className="row">
                        <div className="col p-0">
                            <img
                                src={job.image && job.image.trim() !== '' ? job.image : "/images/carditem.jpg"}
                                alt={job.title}
                                className="img-fluid w-100"
                                style={{
                                    height: "50vh",
                                    objectFit: "cover",
                                    display: "block",
                                    position: "relative",
                                    zIndex: 1
                                }}
                                onError={(e) => {
                                    console.log('Image failed to load:', e.target.src);
                                    console.log('Job image value:', job.image);
                                    e.target.src = "/images/carditem.jpg";
                                }}
                                onLoad={(e) => {
                                    console.log('Image loaded successfully:', e.target.src);
                                    console.log('Job image value:', job.image);
                                }}
                            />
                            {/* Debug overlay to show what image URL we're trying to load */}
                            <div className="position-absolute" style={{ top: "10px", right: "10px", background: "rgba(0,0,0,0.8)", color: "white", padding: "10px", fontSize: "12px", zIndex: 1000 }}>
                                Debug: {job.image ? `Using: ${job.image}` : "No image - using fallback"}
                            </div>
                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{background: 'rgba(0, 0, 0, 0.4)'}}>
                                <div className="container">
                                    <button 
                                        className="btn btn-outline-light mb-4"
                                        onClick={() => navigate('/hiring')}
                                    >
                                        ← Back to Jobs
                                    </button>
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <h1 className="display-5 fw-bold text-white mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>{job.title}</h1>
                                            <div className="d-flex flex-wrap gap-3 mb-4">
                                                <span className="badge bg-danger fs-6 px-3 py-2">{job.type}</span>
                                                <span className="badge bg-outline-light text-light fs-6 px-3 py-2 border border-light">{job.location}</span>
                                            </div>
                                            <p className="lead text-light opacity-90" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                                                Join our talented team at Vagabond Studios and help create the next generation of gaming experiences.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card bg-dark border-secondary mb-4">
                                <div className="card-body p-4">
                                    <h3 className="text-white mb-4">Job Description</h3>
                                    <p className="text-light mb-4">
                                        {job.description || `We are seeking a talented ${job.title} to join our dynamic team at Vagabond Studios. 
                                        This role offers an exciting opportunity to work on cutting-edge gaming projects and contribute to 
                                        innovative game development processes.`}
                                    </p>

                                    <h4 className="text-white mb-3">Key Responsibilities</h4>
                                    <ul className="text-light mb-4">
                                        <li>Collaborate with cross-functional teams to deliver high-quality gaming experiences</li>
                                        <li>Participate in the full game development lifecycle</li>
                                        <li>Implement best practices and maintain coding standards</li>
                                        <li>Contribute to technical discussions and architectural decisions</li>
                                        <li>Stay up-to-date with industry trends and emerging technologies</li>
                                    </ul>

                                    <h4 className="text-white mb-3">Requirements</h4>
                                    <ul className="text-light mb-4">
                                        <li>Bachelor's degree in relevant field or equivalent experience</li>
                                        <li>Strong passion for gaming and game development</li>
                                        <li>Excellent problem-solving and communication skills</li>
                                        <li>Ability to work in a fast-paced, collaborative environment</li>
                                        <li>Portfolio demonstrating relevant skills and experience</li>
                                    </ul>

                                    <h4 className="text-white mb-3">What We Offer</h4>
                                    <ul className="text-light mb-4">
                                        <li>Competitive salary and benefits package</li>
                                        <li>Flexible working arrangements</li>
                                        <li>Professional development opportunities</li>
                                        <li>Creative and collaborative work environment</li>
                                        <li>Opportunity to work on exciting gaming projects</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="card bg-dark border-secondary">
                                <div className="card-body p-4">
                                    <h4 className="text-white mb-3">Ready to Apply?</h4>
                                    <p className="text-light mb-4">
                                        {job.contactEmail 
                                            ? `Send your application to ${job.contactEmail} with your resume, portfolio, and cover letter.`
                                            : "Send us your resume, portfolio, and a cover letter explaining why you'd be a great fit for this position."
                                        }
                                    </p>
                                    
                                    <div className="d-flex flex-wrap gap-3">
                                        {job.applyLink ? (
                                            <a 
                                                href={job.applyLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn btn-danger btn-lg px-5"
                                            >
                                                Apply Now
                                            </a>
                                        ) : job.contactEmail ? (
                                            <a 
                                                href={`mailto:${job.contactEmail}?subject=Application for ${job.title}`}
                                                className="btn btn-danger btn-lg px-5"
                                            >
                                                Send Application
                                            </a>
                                        ) : (
                                            <button className="btn btn-danger btn-lg px-5" disabled>
                                                Contact HR
                                            </button>
                                        )}
                                        
                                        {job.companyWebsite && (
                                            <a 
                                                href={job.companyWebsite} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-light btn-lg px-4"
                                            >
                                                Visit Website
                                            </a>
                                        )}
                                        
                                        <button 
                                            className={`btn ${isSaved ? 'btn-danger' : 'btn-outline-light'} btn-lg px-4`}
                                            onClick={() => {
                                                try {
                                                    // Load current job wishlist
                                                    const jobWishlist = JSON.parse(localStorage.getItem('jobWishlist') || '[]');
                                                    
                                                    // Check if job is already in wishlist
                                                    const isAlreadySaved = jobWishlist.find(j => j._id === job._id);
                                                    
                                                    if (!isAlreadySaved) {
                                                        // Add job to wishlist
                                                        jobWishlist.push(job);
                                                        localStorage.setItem('jobWishlist', JSON.stringify(jobWishlist));
                                                        setIsSaved(true);
                                                        
                                                        // Trigger custom event for navbar update
                                                        window.dispatchEvent(new Event('wishlistChanged'));
                                                        
                                                        alert('Job saved to wishlist successfully!');
                                                    } else {
                                                        alert('Job is already in your wishlist!');
                                                    }
                                                } catch (error) {
                                                    console.error('Error saving job to wishlist:', error);
                                                    alert('Error saving job. Please try again.');
                                                }
                                            }}
                                            title={isSaved ? "Already saved to wishlist" : "Save to wishlist"}
                                        >
                                            <i className={`bi ${isSaved ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                                            {isSaved ? 'Saved to Wishlist' : 'Save Job'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card bg-dark border-secondary mb-4">
                                <div className="card-body p-4">
                                    <h5 className="text-white mb-3">Job Information</h5>
                                    <div className="mb-3">
                                        <span className="text-danger fw-bold">Position: </span>
                                        <span className="text-white">{job.title}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="text-danger fw-bold">Employment Type: </span>
                                        <span className="text-white">{job.type}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="text-danger fw-bold">Location: </span>
                                        <span className="text-white">{job.location}</span>
                                    </div>
                                    {job.department && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Department: </span>
                                            <span className="text-white">{job.department}</span>
                                        </div>
                                    )}
                                    {job.salary && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Salary: </span>
                                            <span className="text-white">{job.salary}</span>
                                        </div>
                                    )}
                                    {job.createdAt && (
                                        <div className="mb-3">
                                            <span className="text-danger fw-bold">Posted: </span>
                                            <span className="text-white">
                                                {new Date(job.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="card bg-dark border-secondary mb-4">
                                <div className="card-body p-4">
                                    <h5 className="text-white mb-3">About Vagabond Studios</h5>
                                    <p className="text-light small">
                                        We're a passionate game development studio creating immersive gaming experiences. 
                                        Join our team and be part of the next generation of gaming innovation.
                                    </p>
                                </div>
                            </div>

                            <div className="card bg-dark border-secondary">
                                <div className="card-body p-4">
                                    <h5 className="text-white mb-3">Share This Job</h5>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-light btn-sm flex-fill">LinkedIn</button>
                                        <button className="btn btn-outline-light btn-sm flex-fill">Twitter</button>
                                        <button className="btn btn-outline-light btn-sm flex-fill">Email</button>
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
