import React from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import "./Footer.css";

const footerQuickLinks = [
  {
    display: "Home",
    url: "#",
  },

  {
    display: "About Us",
    url: "#",
  },

  {
    display: "Courses",
    url: "#",
  },

  {
    display: "Pages",
    url: "#",
  },

  {
    display: "Blogs",
    url: "#",
  },
];

const footerInfoLinks = [
  {
    display: "Privacy Policy",
    url: "#",
  },

  {
    display: "Memberships",
    url: "#",
  },

  {
    display: "Purchases Guide",
    url: "#",
  },

  {
    display: "Terms of Service ",
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="footer my-style" >
      <Container>
        <Row>
          <Col lg="3">
            <h2 className=" d-flex align-items-center gap-1">
              <i class="ri-pantone-line"></i>ASA Schooling System.
            </h2>

            <div className="follows">
              <p className="mb-0">Follow Us on social media</p>
              <span>
                {""}
                <a href="facebook.com">
                  <i class="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {""}
                <a href="instagram.com">
                  <i class="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {""}
                <a href="linkedin.com">
                  <i class="ri-linkedin-line"></i>
                </a>
              </span>

              <span>
                {""}
                <a href="twitter.com">
                  <i class="ri-twitter-x-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="3">
            <h6 className="fw-bold">Explore</h6>
            <ListGroup className="link-list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link-item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h6 className="fw-bold">Information</h6>
            <ListGroup className="link-list">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link-item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h6 className="fw-bold">Get in Touch</h6>
            <p>Address F2 Sector No.3 Metroville Karachi:</p>
            <p>Phone No# : +92 3171034800</p>
            <p>Email: shoaib.amin998@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
