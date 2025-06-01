import React, { useState } from 'react';
import loginImg from '../assets/image1.svg';
import ImgCirlce from '../assets/man-developing-website-on-desk.svg';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          `http://localhost:8083/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        );

        // Store the JWT token in localStorage
        localStorage.setItem('token', response.data.accessToken);

        // Redirect to dashboard or home page
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        // Handle error (show error message to user)
      }
    };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="login-container">
     
       <div className="illustration">
        <img src={loginImg} alt="Login Visual" className="login-image" />

        <div className="overlay-content">
            <div className="illustration-circle">
            <img src={ImgCirlce} alt="Circle Illustration" />
            </div>
            <p className="tagline">Your all in one Placement Preparation Website</p>
        </div>
        </div>

      <div className="right-section">
        <div className="login-form-container">
          <div className="header">
            <h1 className="logo">CODEQUEST</h1>
            <h2 className="welcome">WELCOME</h2>
            <p className="subtitle">Enter your details to log in to your account</p>
          </div>

          <div className="google-login">
            <button className="google-btn" onClick={handleGoogleLogin}>
              <div className="google-icon">G</div>
              <span>Log in with Google</span>
            </button>
            <p className="divider-text">Or with your credentials</p>
          </div>

          <div className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Your Email or Phone no."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div>

            <button type="button" className="login-btn" onClick={handleSubmit}>
              Log In
            </button>
          </div>
          <div className="register-link">
            <p>Don't have an account? <a href="/signup">Register</a></p>
          </div>
          <div className="footer">
            <p className="powered-by">Powered by <a href="#">CodeQuest</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;