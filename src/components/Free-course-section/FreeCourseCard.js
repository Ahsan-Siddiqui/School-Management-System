import React from "react";

const FreeCourseCard = (props) => {
  const { imgUrl, title, students, rating } = props.item;

  return (
    <div className="sigle-free-course">
      <div className="free-course-img mb-5">
        <img src={imgUrl} alt="web-development" className="w-100 mb-2" />
        <button className="btn">Free</button>
      </div>

      <div className="free-course-details">
        <h6>{title}</h6>

        <div className="d-flex align-items-center gap-5">
          <span className="d-flex align-items-center gap-2">
            <i class="ri-user-line"></i> {students}K
          </span>

          <span className="d-flex align-items-center gap-2">
            <i class="ri-star-fill">{rating}K</i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FreeCourseCard;
