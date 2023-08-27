import React from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import img from "../../assests/images/testimonial.jpg";
import "./Testimonial.css";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplayspeed: 3000,
    slidesToScroll: 1,
  };
  return (
    <section className="my-style" id="Blogs">
      <Container>
        <Row>
          <Col lg="10" className="m-auto">
            <div className="testimonial-wrapper d-flex justify-content-between align-items-center">
              <div className="testimonial-img w-50">
                <img src={img} alt="testimonial image" className="w-100" />
              </div>

              <div className="testimonial-content w-50">
                <h2 className="mb-4 m-2">Our students Voice</h2>

                <Slider {...settings}>
                  <div className="mb-4 m-2">
                    <div className="single-testimonial">
                      <h6 className="mb-4 fw-bold">
                        Excellent Course of Materials
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Similique possimus vel alias maxime illo impedit
                        laboriosam quisquam porro totam labore.
                      </p>

                      <div className="students-info mt-4">
                        <h6 className="fw-bold">Muhammad Shoaib Khan</h6>
                        <p>Karachi, Pakistan</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 m-2">
                    <div className="single-testimonial">
                      <h6 className="mb-3 fw-bold">
                        Excellent Course of Materials
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Similique possimus vel alias maxime illo impedit
                        laboriosam quisquam porro totam labore.
                      </p>

                      <div className="students-info mt-4">
                        <h6 className="fw-bold">Muhammad Shoaib Khan</h6>
                        <p>Karachi, Pakistan</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 m-2">
                    <div className="single-testimonial">
                      <h6 className="mb-3 fw-bold">
                        Excellent Course of Materials
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Similique possimus vel alias maxime illo impedit
                        laboriosam quisquam porro totam labore.
                      </p>

                      <div className="students-info mt-4">
                        <h6 className="fw-bold">Muhammad Shoaib Khan</h6>
                        <p>Karachi, Pakistan</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
