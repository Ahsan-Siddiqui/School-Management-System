import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import courseImg2 from '../../assests/images/graphics-design.jpg'
import courseImg3 from '../../assests/images/ui-ux.jpg'
import courseImg1 from '../../assests/images/web-design.jpg'
import CourseCard from './CourseCard'
import './Courses.css'


const coursesData = [
   {
    id:'01',
    title: 'Web Design Bootcamp 2023 for Beginners',
    lesson: 12,
    students: 9.23,
    rating: 4.8,
    imgUrl: courseImg1
   },
    
   {
     id:'02',
    title: 'Professional Graphics Designer, Photoshop, Adobe illustrator, Figma',
    lesson: 12,
    students: 5.78,
    rating: 4.9,
    imgUrl: courseImg2
   },

   {
     id:'03',
    title: 'UI/UX bootcamp 2023 for Beginner',
    lesson: 12,
    students: 9.65,
    rating: 4.7,
    imgUrl: courseImg3
   },
]

const Courses = () => {
  return (
    <section className="my-style" id="Page">
        <Container>
            <Row>
                <Col lg='12' className='mb-5'>
                <div className="course-top d-flex justify-content-between align-items-center">
                    <div className="course-top-left w-50">
                        <h2>Our Popular Courses</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum iusto nemo pariatur enim iste aliquid itaque sunt illo maiores blanditiis?</p>
                    </div>
                    <div className='w-50 text-end'>
                        <button className="btn">See All</button>
                    </div>
                </div>
                </Col>

                {
                 coursesData.map(item =>(
                 <Col lg='4' md='6'>
                    <CourseCard key={item.id} item={item} />         
                </Col>
               ))
                }
            </Row>
        </Container>
    </section>
  )
}

export default Courses