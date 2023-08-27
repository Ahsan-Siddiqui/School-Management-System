import React from "react";
import { Col, Container, Row } from "reactstrap";
import heroImg from "../../assests/images/hero-img.jpg";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section id="Home" className="my-style">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero-content">
              <h2 className="mb-4">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule{" "}
              </h2>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur, <br /> adipisicing elit.
                Sequi sapiente vero voluptates tenetur <br /> fuga hic deserunt
                dolorum eveniet veritatis doloremque.
              </p>

              <div className="search">
                <input type="text" placeholder="Search" />
                <button className="btn"></button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="HeroImg"  className="w-100" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
