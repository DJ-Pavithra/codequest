import React, { useState } from 'react';
import loginImg from '../assets/image1.svg';
import ImgCirlce from '../assets/man-developing-website-on-desk.svg';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8083/signup?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );
      alert('Sign up successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('Sign up failed. Try a different username.');
    }
  };

  return (
    <div className="login-container">
      <div className="illustration">
        <img src={loginImg} alt="Sign Up Visual" className="login-image" />
        <div className="overlay-content">
          <div className="illustration-circle">
            <img src={ImgCirlce} alt="Circle Illustration" />
          </div>
          <p className="tagline">Join CodeQuest for your placement journey!</p>
        </div>
      </div>
      <div className="right-section">
        <div className="login-form-container">
          <div className="header">
            <h1 className="logo">CODEQUEST</h1>
            <h2 className="welcome">SIGN UP</h2>
            <p className="subtitle">Create your account</p>
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="button" className="login-btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <p style={{ marginTop: 10 }}>
              Already have an account? <a href="/login">Log In</a>
            </p>
          </div>
          <div className="footer">
            <p className="powered-by">Powered by <a href="#">CodeQuest</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;