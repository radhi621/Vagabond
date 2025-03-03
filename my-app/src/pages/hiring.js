import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function Hiring() {
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
                    <h1>JOIN OUR TEAM</h1>
                    <br></br>
                    <div className="border-bottom border-3"></div>
                </div>
            </div>
        </div>
        </div>
        




        <div className="container-fluid bg-black py-4">
  <div className="row justify-content-center g-4">

    <div className="col-lg-8 mb-5">
      <div className="card bg-transparent mb-4 border border-secondary">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="text-white fw-bold mb-2">SENIOR UNREAL ENGINE DEVELOPER</h2>
              <p className="text-danger mb-2">Remote / Scottsdale, AZ</p>
              <p className="text-secondary mb-0">Full-Time</p>
            </div>
            <a href="#" className="btn btn-danger text-light px-4 fw-bold">LEARN MORE</a>
          </div>
        </div>
      </div>

      <div className="card bg-transparent mb-4 border border-secondary">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="text-white fw-bold mb-2">UNREAL ENGINE DEVELOPER</h2>
              <p className="text-danger mb-2">Remote / Scottsdale, AZ</p>
              <p className="text-secondary mb-0">Full-Time</p>
            </div>
            <a href="#" className="btn btn-danger text-light px-4 fw-bold">LEARN MORE</a>
          </div>
        </div>
      </div>

      <div className="card bg-transparent mb-4 border border-secondary">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="text-white fw-bold mb-2">LEVEL DESIGNER</h2>
              <p className="text-danger mb-2">Remote / Scottsdale, AZ</p>
              <p className="text-secondary mb-0">Full-Time</p>
            </div>
            <a href="#" className="btn btn-danger text-light px-4 fw-bold">LEARN MORE</a>
          </div>
        </div>
      </div>

      <div className="card bg-transparent border border-secondary">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="text-white fw-bold mb-2">SENIOR ENVIRONMENT ARTIST</h2>
              <p className="text-danger mb-2">Remote / Scottsdale, AZ</p>
              <p className="text-secondary mb-0">Full-Time</p>
            </div>
            <a href="#" className="btn btn-danger text-light px-4 fw-bold">LEARN MORE</a>
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
