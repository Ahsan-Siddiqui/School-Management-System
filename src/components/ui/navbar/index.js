import React from 'react';
import './navbar.css'; // Import the CSS file for styling
import 'bootstrap/js/dist/dropdown'
const Navbar = ({Toggle}) => {
  const data = localStorage.getItem("userData");
  const user = JSON.parse(data);
  const handleLogout = () => {
    localStorage.removeItem("userData");
  };
  const userName = user.userDetail.name.charAt(0).toUpperCase() + user.userDetail.name.slice(1);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i className='navbar-brand bi bi-justify-left fs-4' onClick={Toggle}></i>
      <button className='navbar-toggle d-lg-none' type='button' data-bs-toggle='collapse'
      data-bs-aria-expanded='false' aria-label='Toggle navigation'>
      </button>
      <div className='collapse navbar-collapse' id='collapsibleNavId'>
        <ul className='navbar-nav ms-auto mt-2 mt-lg-0'>
          <li className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' href='#' id='dropdownId'
            data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
           {userName}
            </a>
            <div className='dropdown-menu' aria-labelledby='dropdownId'>
              <a className='dropdown-item' href='#'>Profile</a>
              <a className='dropdown-item' href='/' onClick={handleLogout}>Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
