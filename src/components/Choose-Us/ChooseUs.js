import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Col, Container, Row } from "reactstrap";
import chooseImg from "../../assests/images/laptop.jpg";
import "./Choose-us.css";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="my-style">
      <Container>
        <Row>
          <Col lg="6">
            <div className="choose-content">
              <h2>Why Choose Us</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur nam cumque, iste modi adipisci excepturi corporis
                accusamus incidunt! Reprehenderit, Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Neque voluptates labore nemo,
                eius, dolor recusandae illum quasi, quibusdam id quisquam quo
                exercitationem reprehenderit ipsam aliquid totam nobis sint
                provident. Earum quam enim animi quidem omnis?
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="choose-img">
              {showVideo ? (
                <ReactPlayer
                  url="https://youtu.be/nLsqo6loDo4"
                  controls
                  width="100%"
                  height="300px"
                />
              ) : (
                <img src={chooseImg} alt="laptop pic" className="w-100" />
              )}

              {!showVideo && (
                <span className="play-icon">
                  <i
                    class="ri-play-circle-line"
                    onClick={() => setShowVideo(!showVideo)}
                  ></i>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
