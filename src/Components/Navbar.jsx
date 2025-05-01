import logo from '../assets/image.png';
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  return (
    <nav className="navbar">
    <img src={logo} alt="" className="logo" />

   <div className="navMenu">
  <Link to="/" className="navMenuActive">Home</Link>
  <Link to="/challenges" className="navMenuItem">Challenges</Link>
  <Link to="/aptitude" className="navMenuItem">Aptitude</Link>
  <Link to="/leaderboard" className="navMenuItem">Leaderboard</Link>
   </div>
    <div className="userIcon">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
</div>
</nav>
  );
}

export default Navbar1;