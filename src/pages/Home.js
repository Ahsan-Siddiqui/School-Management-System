import React from "react";
import AboutUs from "../components/About-us/AboutUs";
import ChooseUs from "../components/Choose-Us/ChooseUs";
import CompanySection from "../components/Company-section/Company";
import Courses from "../components/Courses-section/Courses";
import Features from "../components/Feature-section/Features";
import Footer from "../components/Footer/Footer";
import FreeCourse from "../components/Free-course-section/FreeCourse";
import Header from "../components/Header/Header";
import HeroSection from "../components/Hero-Section/HeroSection";
import Newsletter from "../components/Newsletter/Newsletter";
import Testimonials from "../components/Testimonial/Testimonials";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <CompanySection />
      <AboutUs />
      <Courses />
      <ChooseUs />
      <Features />
      <FreeCourse />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
