import React from 'react';

const Success = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
        </div>
        <h2 className="mb-3">Thank you for your purchase!</h2>
        <p className="mb-4">Your payment was successful. We appreciate your business.</p>
        <a href="/" className="btn btn-danger">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default Success;
