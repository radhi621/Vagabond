import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
export default function Games() {
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
                    <h1>CHECK OUT OUR GAMES</h1>
                    <br></br>
                    <div className="border-bottom border-3"></div>
                </div>
            </div>
        </div>
        </div>
        




        <div className="container-fluid bg-black p-4">
  <div className="row g-4">
    <div className="col-md-6">
      <div className="card bg-dark text-white h-100">
        <img src="../images/Horror_Game.png" className="card-img-top" style={{ height: "300px", objectFit: "cover" }} alt="Unreal Engine"/>
        <div className="card-body bg-dark">
          <h5 className="card-title fw-bold mb-3">BUILT IN UNREAL ENGINE 5</h5>
          <p className="card-text text-light opacity-75">Bellum harnesses the power of Unreal Engine 5, utilizing Lumen and Nanite technology to create stunning and immersive environments. Explore new expansive terrains set in Africa with maps designed to empower deliberate tactical decisions.</p>
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <div className="card bg-dark text-white h-100">
        <img src="../images/Horror_Game.png" className="card-img-top"  style={{ height: "300px", objectFit: "cover" }} alt="Weapons"/>
        <div className="card-body bg-dark">
          <h5 className="card-title fw-bold mb-3">NEW WEAPONS AND EQUIPMENT</h5>
          <p className="card-text text-light opacity-75">Bellum features factions equipped with next-generation weapons and technology. From the latest arms and vehicles, to advanced electronic systems, every detail has been meticulously crafted to ensure authenticity.</p>
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <div className="card bg-dark text-white h-100">
        <img src="../images/Horror_Game.png" className="card-img-top"  style={{ height: "300px", objectFit: "cover" }} alt="Weapons"/>
        <div className="card-body bg-dark">
          <h5 className="card-title fw-bold mb-3">NEW WEAPONS AND EQUIPMENT</h5>
          <p className="card-text text-light opacity-75">Bellum features factions equipped with next-generation weapons and technology. From the latest arms and vehicles, to advanced electronic systems, every detail has been meticulously crafted to ensure authenticity.</p>
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <div className="card bg-dark text-white h-100">
        <img src="../images/Horror_Game.png" className="card-img-top"  style={{ height: "300px", objectFit: "cover" }} alt="Weapons"/>
        <div className="card-body bg-dark">
          <h5 className="card-title fw-bold mb-3">NEW WEAPONS AND EQUIPMENT</h5>
          <p className="card-text text-light opacity-75">Bellum features factions equipped with next-generation weapons and technology. From the latest arms and vehicles, to advanced electronic systems, every detail has been meticulously crafted to ensure authenticity.</p>
        </div>
      </div>
    </div>

  </div>
</div>



<Footer />

        </>
    );
}
