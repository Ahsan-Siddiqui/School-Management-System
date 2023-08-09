import React from 'react';
import './style.css'; // Import the CSS file for styling

const Header = () => {
  const data = localStorage.getItem("userData");
  const user = JSON.parse(data);
  const userName = user.name.charAt(0).toUpperCase() + user.name.slice(1);
  return (
    <nav className="navbar">
      <div className="logo"></div>
      <ul className="nav-links">
        {/* <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li> */}
        <li>{userName}</li>
        <li><img src={user.image} className='profileImg'/></li>
      </ul>
    </nav>
  );
};

export default Header;
