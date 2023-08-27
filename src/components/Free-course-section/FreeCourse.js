import React from "react";
import { Col, Container, Row } from "reactstrap";
import courseImg02 from "../../assests/images/kids-learning.jpg";
import courseImg03 from "../../assests/images/seo.jpg";
import courseImg04 from "../../assests/images/ui-ux.jpg";
import courseImg01 from "../../assests/images/web-develpment.jpg";
import FreeCourseCard from "./FreeCourseCard";
import "./free-course.css";

const freeCourseData = [
  {
    id: "01",
    title: "Basics Web Development Course",
    imgUrl: courseImg01,
    students: 4.7,
    rating: 3.4,
  },
  {
    id: "02",
    title: "Coding For Juniors Basics Course",
    imgUrl: courseImg02,
    students: 3.8,
    rating: 2.6,
  },
  {
    id: "03",
    title: "Search Engine OPtimization- Basic",
    imgUrl: courseImg02,
    students: 4.3,
    rating: 4.7,
  },
  {
    id: "04",
    title: "Basic UI/UX Design -Figma",
    imgUrl: courseImg04,
    students: 5.21,
    rating: 4.1,
  },
];

const FreeCourse = () => {
  return (
    <section id="Courses" className="my-style">
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5 ">
            <h2 className="fw-bold">Our Free Courses</h2>
          </Col>

          {freeCourseData.map((item) => (
            <Col lg="3" key={item.id}>
              <FreeCourseCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FreeCourse;
