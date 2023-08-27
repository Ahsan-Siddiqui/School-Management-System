import React from "react";
import CountUp from "react-countup";
import { Col, Container, Row } from "reactstrap";
import aboutImg from "../../assests/images/about-us.jpg";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <section id="About" className="my-style">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about-img">
              <img src={aboutImg} alt="About Us" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about-content">
              <h2>About Us</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Expedita mollitia sed fugiat quibusdam provident distinctio
                doloribus alias eaque porro iste.
              </p>

              <div className="about-counter">
                <div className="d-flex gap-5 align-items-center">
                  <div className="single-counter">
                    <span className="counter">
                      <CountUp start={0} end={25} duration={2} suffix="K" />
                    </span>

                    <p className="counter-title">Completed Projects</p>
                  </div>

                  <div className="single-counter">
                    <span className="counter">
                      <CountUp start={0} end={12} duration={2} suffix="M" />
                    </span>

                    <p className="counter-title">Patient Around World</p>
                  </div>
                </div>

                <div className="d-flex gap-5 align-items-center">
                  <div className="single-counter">
                    <span className="counter">
                      <CountUp start={0} end={25} duration={2} suffix="K" />
                    </span>

                    <p className="counter-title">Completed Projects</p>
                  </div>

                  <div className="single-counter">
                    <span className="counter">
                      <CountUp start={0} end={12} duration={2} suffix="M" />
                    </span>

                    <p className="counter-title">Patient Around World</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
