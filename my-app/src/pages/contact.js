import Navbar from "../components/navbar";
import React, { useState, useEffect } from "react";
import Footer from "../components/footer";

export default function Contact() {
  const [imageHeight, setImageHeight] = useState(window.innerWidth <= 576 ? "70vh" : "50vh");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setImageHeight(window.innerWidth <= 576 ? "70vh" : "50vh");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // First check if response is ok before trying to parse JSON
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      // Try to parse JSON response safely
      let data;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          // Handle non-JSON responses
          const text = await response.text();
          console.log("Non-JSON response:", text);
          data = { success: true }; // Assume success if response is OK
        }
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error("Couldn't parse server response");
      }
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general"
      });
      
      setSubmitStatus("success");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
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
                alt="Contact Us"
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
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 ">
              <h1 className="mb-4 text-center p-5">CONTACT US</h1>
              <div className="border-bottom border-3 mb-5"></div>
              
              {/* Contact Form */}
              <div className="mb-5">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="mb-4">
                    <label htmlFor="inquiryType" className="form-label text-white fw-bold">INQUIRY TYPE</label>
                    <select 
                      className="form-select bg-dark text-white border-white" 
                      id="inquiryType" 
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="press">Press Inquiry</option>
                      <option value="creator">Content Creator/Streamer</option>
                      <option value="business">Business Inquiry</option>
                    </select>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-md-6 mb-4 mb-md-0">
                      <label htmlFor="name" className="form-label text-white fw-bold">NAME</label>
                      <input 
                        type="text" 
                        className="form-control bg-dark text-white border-white" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label text-white fw-bold">EMAIL</label>
                      <input 
                        type="email" 
                        className="form-control bg-dark text-white border-white" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="form-label text-white fw-bold">SUBJECT</label>
                    <input 
                      type="text" 
                      className="form-control bg-dark text-white border-white" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label text-white fw-bold">MESSAGE</label>
                    <textarea 
                      className="form-control bg-dark text-white border-white" 
                      id="message" 
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="btn btn-danger btn-lg px-5 py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : null}
                      {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                    </button>
                  </div>
                  
                  {submitStatus === "success" && (
                    <div className="alert alert-success mt-4 text-center" role="alert">
                      Your message has been sent successfully!
                    </div>
                  )}
                  
                  {submitStatus === "error" && (
                    <div className="alert alert-white mt-4 text-center" role="alert">
                      Something went wrong. Please try again later or contact us directly via email.
                    </div>
                  )}
                </form>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}