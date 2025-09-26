import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Hiring() {
  const [jobs, setJobs] = useState([]);
  const [imageHeight, setImageHeight] = useState(window.innerWidth <= 576 ? "70vh" : "50vh");
  const [savedJobs, setSavedJobs] = useState([]);

  
      const getJobRoute = (job) => {
        return `/jobs/${job._id}`; // Dynamic route using job ID
    };

  useEffect(() => {
    const handleResize = () => {
      setImageHeight(window.innerWidth <= 576 ? "70vh" : "50vh");
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Fetch job listings from the server
    fetch("http://localhost:5000/api/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
    
    // Load saved jobs from wishlist
    const jobWishlist = JSON.parse(localStorage.getItem('jobWishlist') || '[]');
    setSavedJobs(jobWishlist.map(job => job._id));
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
                alt="Games"
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
              <h1>JOIN OUR TEAM</h1>
              <br />
              <div className="border-bottom border-3"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-black py-2">
        <div className="row justify-content-center g-4">
          {jobs.map((job, index) => (
            <div className="col-lg-7 mb-5" key={job._id}>
              <div className="card bg-transparent mb-4 border border-secondary" 
                   style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-5px)';
                     e.currentTarget.style.borderColor = '#dc3545';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.borderColor = '#6c757d';
                   }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <h2 className="text-white fw-bold mb-2">{job.title}</h2>
                      <p className="text-danger mb-2">{job.location}</p>
                      <p className="text-secondary mb-0">{job.type}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <button 
                        className={`btn ${savedJobs.includes(job._id) ? 'btn-danger' : 'btn-outline-light'} px-3`}
                        onClick={(e) => {
                          e.stopPropagation();
                          try {
                            // Load current job wishlist
                            const jobWishlist = JSON.parse(localStorage.getItem('jobWishlist') || '[]');
                            
                            // Check if job is already in wishlist
                            const isAlreadySaved = jobWishlist.find(j => j._id === job._id);
                            
                            if (!isAlreadySaved) {
                              // Add job to wishlist
                              jobWishlist.push(job);
                              localStorage.setItem('jobWishlist', JSON.stringify(jobWishlist));
                              setSavedJobs(prev => [...prev, job._id]);
                              
                              // Trigger custom event for navbar update
                              window.dispatchEvent(new Event('wishlistChanged'));
                              
                              // Visual feedback
                              e.target.style.color = '#dc3545';
                              e.target.innerHTML = '<i class="bi bi-heart-fill me-1"></i>Saved!';
                              setTimeout(() => {
                                e.target.className = 'btn btn-danger px-3';
                                e.target.innerHTML = '<i class="bi bi-heart-fill me-1"></i>Saved';
                              }, 1000);
                            } else {
                              // Visual feedback that it's already saved
                              e.target.style.color = '#ffc107';
                              e.target.innerHTML = '<i class="bi bi-heart-fill me-1"></i>Already Saved';
                              setTimeout(() => {
                                e.target.style.color = '';
                                e.target.innerHTML = '<i class="bi bi-heart-fill me-1"></i>Saved';
                              }, 1500);
                            }
                          } catch (error) {
                            console.error('Error saving job to wishlist:', error);
                          }
                        }}
                        title={savedJobs.includes(job._id) ? "Already saved to wishlist" : "Save to wishlist"}
                      >
                        <i className={`bi ${savedJobs.includes(job._id) ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>
                        {savedJobs.includes(job._id) ? 'Saved' : 'Save'}
                      </button>
                      <Link to={getJobRoute(job)} className="btn btn-danger text-light px-4 fw-bold">
                        LEARN MORE
                      </Link>
                    </div>
                  </div>
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
