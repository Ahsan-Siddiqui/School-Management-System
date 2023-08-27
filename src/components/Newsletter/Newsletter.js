import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="my-style">
      <Container className="newsletter">
        <Row>
          <Col lg="12" className="text-center">
            <h2 className="mb-4">Subscribe Our Newsletter</h2>
            <div className="subscribe">
              <input type="text" placeholder="Email" />
              <button className="btn">Subscribe</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
