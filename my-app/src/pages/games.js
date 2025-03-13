
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Games() {
    const [games, setGames] = useState([]);
    const [imageHeight, setImageHeight] = useState(window.innerWidth <= 576 ? "70vh" : "50vh");

    // Fetch games from the backend
    useEffect(() => {
        fetch("http://localhost:5000/api/games")
            .then((response) => response.json())
            .then((data) => setGames(data))
            .catch((error) => console.error("Error fetching games:", error));
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
                     <h1>CHECK OUT OUR GAMES</h1>
                     <br></br>
                    <div className="border-bottom border-3"></div>
                 </div>
             </div>
         </div>
         </div>
            <div className="container-fluid bg-black p-4 pb-5">
                <div className="row g-4">
                    {games.map((game, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="card bg-dark text-white h-100">
                                <img
                                    src={game.image} // Use the `image` field from your database
                                    className="card-img-top"
                                    style={{ height: "300px", objectFit: "cover" }}
                                    alt={game.title}
                                />
                                <div className="card-body bg-dark">
                                    <h5 className="card-title fw-bold mb-3">{game.title}</h5>
                                    <p className="card-text text-light opacity-75">{game.description}</p>
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

