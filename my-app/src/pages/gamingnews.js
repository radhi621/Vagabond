import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const GamingNews = () => {
   const [news, setNews] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageHeight, setImageHeight] = useState(window.innerWidth <= 576 ? "70vh" : "50vh");

  useEffect(() => {
    axios
      .get('https://newsapi.org/v2/everything', {
        params: {
          q: 'steam video games',
          apiKey: 'ee90b621aeeb40ccbf03d756425986ce', 
          sortBy: 'publishedAt', 
          pageSize: 20, 
        },
      })
      .then((response) => {
        setArticles(response.data.articles); // Set the articles state with the fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false); // Stop loading in case of error
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <Navbar />
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
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
            <h1>GLOBAL GAMING NEWS</h1>
            <div className="border-bottom border-3"></div>
          </div>
        </div>
      </div>

      {/* Fixed container for articles */}
      <div className="container " style={{ maxWidth: '1200px', overflowX: 'hidden' }}>
        <div className="row" style={{ maxHeight: '70vh', overflowY: 'auto', marginBottom: '50px', marginTop: '50px', padding: '0 15px' }}>
          {articles.map((article, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card bg-dark text-white h-100">
                {/* Display the image preview if available */}
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    className="card-img-top"
                    alt={article.title}
                    style={{
                      objectFit: 'cover',
                      height: '200px', // Adjust the image height to fit within the card
                    }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-white">
                      {article.title}
                    </a>
                  </h5>
                  <p className="card-text">
                    {article.description ? article.description : 'No description available'}
                  </p>
                  <div className="mt-auto">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>





    <div className="container-fluid bg-black p-4">
                <div className="row justify-content-center g-4 mb-5"> 
                    {news.map((article) => (
                        <div className="col-lg-8 d-flex justify-content-center" key={article._id}> {/* Center content */}
                            <div className="card bg-dark border-0 overflow-hidden w-100"> {/* Full width in column */}
                                <div className="row g-0">
                                    <div className="col-md-6">
                                        <img src={article.image} className="img-fluid w-100" style={{ height: "300px", objectFit: "cover" }} alt={article.title} />
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center bg-dark">
                                        <div className="card-body p-4">
                                            <h2 className="text-white fw-bold mb-2">{article.title}</h2>
                                            <p className="text-secondary mb-0">{article.description}</p>
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
};

export default GamingNews;