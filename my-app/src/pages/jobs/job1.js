import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import React, { useState, useEffect } from "react";

export default function Job1() {
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
              <h1>'TITLE' JOB</h1>
              <br />
              <div className="border-bottom border-3"></div>
            </div>
          </div>
        </div>
      </div>

      

      <Footer />
    </>
  );
}
