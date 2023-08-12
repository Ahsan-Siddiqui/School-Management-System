import React from 'react';
import './header.css'; // Import the CSS file for styling
import Navbar from '../navbar';

const Header = () => {
  const data = localStorage.getItem("userData");
  const user = JSON.parse(data);
  const userName = user.userDetail.name.charAt(0).toUpperCase() + user.userDetail.name.slice(1);
  return (
    <div>
      <Navbar/>
    </div>
  );
};

export default Header;
