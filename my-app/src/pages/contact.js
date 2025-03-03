import Navbar from "../components/navbar";
import React, { useState, useEffect } from "react";
import Footer from "../components/footer";

export default function Contact() {
  const [imageHeight, setImageHeight] = useState(window.innerWidth <= 576 ? "70vh" : "50vh");
 
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
              <div className="container text-center py-5"> 
                  <div className="row justify-content-center">
                      <div className="col-lg-8 text-start">
                          <h1 className="mb-4 text-center p-5">CONTACT US</h1>
                          <div className="border-bottom border-3 mb-4 mb-5"></div>
                          <div className="mb-5">
                              <h2 className="fs-3 mb-3">PRESS INQUIRIES<span className="text-danger"> - <a href="#" className="text-danger text-decoration-none">Download our Press Kit</a></span></h2>
                              <p className="text-white">
                                  If you're a member of the press and have inquiries, please reach out to us at:<br />
                                  <a href="mailto:press@astarte.industries" className="text-danger text-decoration-none">press@astarte.industries</a>
                              </p>
                          </div>
                          <div className="mb-5">
                              <h2 className="fs-3 mb-3">CONTENT CREATORS & STREAMERS</h2>
                              <p className="text-white">
                                  For collaborations and inquiries related to content creation or streaming, please contact us at:<br />
                                  <a href="mailto:creator@astarte.industries" className="text-danger text-decoration-none">creator@astarte.industries</a>
                              </p>
                          </div>
                          <div className="mb-5">
                              <h2 className="fs-3 mb-3">COMPANY & BUSINESS INQUIRIES</h2>
                              <p className="text-white">
                                  For business, corporate, or partnership-related inquiries, please email us at:<br />
                                  <a href="mailto:business@astarte.industries" className="text-danger text-decoration-none">business@astarte.industries</a>
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <Footer />
      </>
  )
}
