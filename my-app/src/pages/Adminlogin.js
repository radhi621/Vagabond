import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken, getToken } from '../utils/auth';

export default function Adminlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Verify if token is still valid
      fetch('http://localhost:5000/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      })
        .then((res) => {
          if (res.ok) {
            navigate('/dashboard');
          }
        })
        .catch(() => {
          // Token invalid, stay on login page
        });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data.token);
        navigate('/dashboard');
      } else {
        setError(data.error || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card bg-black border-secondary shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <img src="/images/logo.png" alt="Logo" height="60" className="mb-3" />
                  <h2 className="text-white fw-bold">Admin Login</h2>
                  <p className="text-white-50">Access the dashboard</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white">
                      <i className="fas fa-user me-2"></i>Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-white">
                      <i className="fas fa-lock me-2"></i>Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control bg-dark text-white border-secondary"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-danger w-100 py-2 fw-bold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Login
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <a href="/" className="text-white-50 text-decoration-none">
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
