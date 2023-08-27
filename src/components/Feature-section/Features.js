import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./Features.css";

const FeaturesData = [
  {
    title: "quick Learning",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur culpa adipisci repellat ratione velit voluptatibus cum modi expedita maxime recusandae.",
    icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur culpa adipisci repellat ratione velit voluptatibus cum modi expedita maxime recusandae.",
    icon: "ri-discuss-line",
  },

  {
    title: "Certification",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur culpa adipisci repellat ratione velit voluptatibus cum modi expedita maxime recusandae.",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section className="my-style">
      <Container>
        <Row>
          {FeaturesData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single-feature text-center px-4">
                <h2 className="mb-3">
                  <i class={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
