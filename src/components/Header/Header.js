import React, { useRef,useState,useEffect } from "react";
import { Container } from "reactstrap";
import "./Header.css";

const navLinks = [
  {
    display: "Home",
    url: "#Home",
  },

  {
    display: "About",
    url: "#About",
  },

  {
    display: "Courses",
    url: "#Courses",
  },

  {
    display: "Page",
    url: "#Page",
  },

  {
    display: "Blogs",
    url: "#Blogs",
  },
];

const Header = () => {
  const menuRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [isFixed, setIsFixed] = useState(false); // State for the fixed header


  const toggleMenu = () => {
    setToggle(!toggle);
  };
 const handleScroll = () => {
    if (window.scrollY > 100) { // Adjust the value as needed
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header  className={`header ${isFixed ? "fixed-header" : ""}`}>
      <Container>
        <div className="Navigation d-flex align-items-center justify-content-between ">
          <div className="logo">
            <h2 className=" d-flex align-items-center">
              <i class="ri-pantone-line"></i>BQ Schooling System
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav-menu" ref={menuRef} >
              <ul className="nav-list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav-item">
                    <a href={item.url} onClick={toggleMenu}> {item.display} </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav-right">
              <p className="mb-0 d-flex align-items-center gap-2">
                <i class="ri-phone-line"></i>+92 317 1034800
              </p>
            </div>
          </div>
          <div className={`mobile-menu ${toggle ? "active-menu" : ""}`}>
            <span >
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
