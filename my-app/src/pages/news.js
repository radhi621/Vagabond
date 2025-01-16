import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function News() {                                                                                
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
                <div className="col ">
                    <h1>CHECK OUT OUR LATEST NEWS</h1>
                    <br></br>
                    <div className="border-bottom border-3"></div>
                </div>
            </div>
        </div>
        </div>
        





        <div className="container-fluid bg-black p-4">
  <div className="row justify-content-center g-4">
    <div className="col-lg-8">
      <div className="card bg-dark border-0 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6">
            <img src="../images/Horror_Game.png" className="img-fluid w-100" style={{height: "300px", objectfit: "cover;"}} alt="Level update"/>
          </div>
          <div className="col-md-6 d-flex align-items-center" style={{backgroundcolor: "#333;"}}>
            <div className="card-body p-4">
              <h2 className="text-white fw-bold mb-2">LEVEL UPDATE #1</h2>
              <p className="text-secondary mb-0">Check out the latest level update.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-8">
      <div className="card bg-dark border-0 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6">
            <img src="../images/Horror_Game.png" className="img-fluid w-100" style={{height: "300px", objectfit: "cover;"}} alt="Art update"/>
          </div>
          <div className="col-md-6 d-flex align-items-center" style={{backgroundcolor: "#333;"}}>
            <div className="card-body p-4">
              <h2 className="text-white fw-bold mb-2">ART UPDATE #1</h2>
              <p className="text-secondary mb-0">Check out the latest art update.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-8">
      <div className="card bg-dark border-0 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6">
            <img src="../images/Horror_Game.png" className="img-fluid w-100" style={{height: "300px", objectfit: "cover;"}}        alt="Developer profile"/>
          </div>
          <div className="col-md-6 d-flex align-items-center" style={{backgroundcolor: "#333;"}}>
            <div className="card-body p-4">
              <h2 className="text-white fw-bold mb-2">DEVELOPER PROFILE #2</h2>
              <p className="text-secondary mb-0">Meet GRIM, our in-house military advisor.</p>
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
