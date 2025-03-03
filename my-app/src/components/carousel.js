import React, { useEffect, useState } from "react";

export default function VideoCarousel() {
  const [videoHeight, setVideoHeight] = useState(
    window.innerWidth <= 576 ? "70vh" : "100vh"
  );

  useEffect(() => {
    const handleResize = () => {
      setVideoHeight(window.innerWidth <= 576 ? "70vh" : "100vh");
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div id="videoCarousel" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#videoCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Video 1"
          ></button>
          <button
            type="button"
            data-bs-target="#videoCarousel"
            data-bs-slide-to="1"
            aria-label="Video 2"
          ></button>
          <button
            type="button"
            data-bs-target="#videoCarousel"
            data-bs-slide-to="2"
            aria-label="Video 3"
          ></button>
        </div>

        <div className="carousel-inner">
          {/* Video Slide 1 */}
          <div className="carousel-item active">
            <video
              className="d-block w-100"
              autoPlay
              muted
              loop
              playsInline
              style={{
                objectFit: "cover",
                width: "100%",
                height: videoHeight,
              }}
            >
              <source src="/videos/carousel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="carousel-caption d-none d-md-block">
              <h5>First Video</h5>
              <p>Description for the first video slide.</p>
            </div>
          </div>

          {/* Video Slide 2 */}
          <div className="carousel-item">
            <video
              className="d-block w-100"
              autoPlay
              muted
              loop
              playsInline
              style={{
                objectFit: "cover",
                width: "100%",
                height: videoHeight,
              }}
            >
              <source src="/videos/carousel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="carousel-caption d-none d-md-block">
              <h5>Second Video</h5>
              <p>Description for the second video slide.</p>
            </div>
          </div>

          {/* Video Slide 3 */}
          <div className="carousel-item">
            <video
              className="d-block w-100"
              autoPlay
              muted
              loop
              playsInline
              style={{
                objectFit: "cover",
                width: "100%",
                height: videoHeight,
              }}
            >
              <source src="/videos/carousel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="carousel-caption d-none d-md-block">
              <h5>Third Video</h5>
              <p>Description for the third video slide.</p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#videoCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#videoCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
