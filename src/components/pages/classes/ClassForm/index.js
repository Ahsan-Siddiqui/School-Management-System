import React, { useState, useEffect } from "react";
import "./classForm.css"; // Import your CSS file
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Card from "../../../ui/card";
import ClassList from "../classList";
const ClassRecordForm = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    // First GET request
    axios
      .get("http://localhost:8080/api/Teacher", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json", // Set the Content-Type header
        },
      })
      .then((response) => {
        setTeacherList(response.data); // Update the teacherList state with response data
      })
      .catch((error) => console.error("Error fetching teacher list:", error));

    // Second GET request
    axios
      .get("http://localhost:8080/api/Student", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json", // Set the Content-Type header
        },
      })
      .then((response) => {
        setStudentList(response.data); // Update the studentList state with response data
      })
      .catch((error) => console.error("Error fetching student list:", error));
}, [authToken]);

const handleCheckboxChange = (e) => {
  const { name, value, checked } = e.target;
  if (checked) {
    // Add student ID to the array
    setUser((prevUser) => ({
      ...prevUser,
      [name]: [...prevUser[name], value],
    }));
  } else {
    // Remove student ID from the array
    setUser((prevUser) => ({
      ...prevUser,
      [name]: prevUser[name].filter((id) => id !== value),
    }));
  }
};


  const [user, setUser] = useState({
    gradeName: "",
    gradeId: "",
    room: "",
    teacherAssign: "",
    schedule: "",
    studentsEnroll: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const UserRegister = async (e) => {
    e.preventDefault();

    try {
      const {
        gradeName,
        gradeId,
        teacherAssign,
        schedule,
        studentsEnroll,
        room,
      } = user;

      // Replace 'authToken' with your actual authentication token
      const authToken = users.saveToken;

      const response = await axios.post(
        "http://localhost:8080/api/classes",
        {
          gradeName,
          gradeId,
          teacherAssign,
          schedule,
          studentsEnroll,
          room,
        },
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.msg);
      console.log(response);
      history.push('/class');
      window.location.reload();
    } catch (error) {
      // Handle errors here
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        alert("An error occurred.");
      }
    }
  };

  return (
    <div className="commonFormContainer">
      {console.log(user)}
      <h1>Create New Class</h1>
      <Card className="commonForm">
        <form onSubmit={UserRegister}>
          <div className="input-control">
            <label htmlFor="gradeName">Class Name</label>
            <input
              type="gradeName"
              name="gradeName"
              value={user.gradeName}
              onChange={handleChange}
              placeholder="Enter Class Name"
            />
          </div>
          <div className="input-control">
            <label htmlFor="gradeId">Week Days</label>
            <input
              type="gradeId"
              name="gradeId"
              onChange={handleChange}
              value={user.gradeId}
              placeholder="Enter Day Name"
            />
          </div>
          <div className="input-control">
            <label htmlFor="room">Room Number</label>
            <input
              type="room"
              name="room"
              onChange={handleChange}
              value={user.room}
              placeholder="Enter Room Number"
            />
          </div>
          <div className="input-control select-container">
            <label htmlFor="selectOpt">Select Teacher</label>
            <select
              name="teacherAssign"
              value={user.teacherAssign}
              onChange={handleChange}
              className="custom-select"
            >
              {" "}
              {teacherList.map((teachers) => (
                <option key={teachers._id} value={teachers._id}>{teachers.name}</option>
              ))}
            </select>
          </div>
          <div className='input-control'>
              <label htmlFor='room'>Date and Time</label>
              <input 
              type="schedule" 
              name="schedule"
              onChange={handleChange} 
              value={user.schedule}
              placeholder='Enter Date and Time'
              />
          </div>
          <div className="input-control select-container">
        <label htmlFor="studentsEnroll">Select Students</label>
        <div className={`dropdown-checkbox${showDropdown ? ' open' : ''}`}>
          <div className="dropdown-toggle custom-select" onClick={toggleDropdown}>
            {user.studentsEnroll.length > 0
              ? `${user.studentsEnroll.length} students selected`
              : 'Select students'}
          </div>
          <div className="dropdown-options">
            {showDropdown &&
              studentList.map((student) => (
                <label key={student._id} className="checkbox-label">
                  <div className="student-row">
                    <span className="student-name">{student.name}</span>
                    <input
                      type="checkbox"
                      name="studentsEnroll"
                      value={student._id}
                      checked={user.studentsEnroll.includes(student._id)}
                      onChange={handleCheckboxChange}
                      className="float-right"
                    />
                  </div>
                </label>
              ))}
          </div>
        </div>
      </div>

          {/* <div className="input-control select-container">
            <label htmlFor="selectOpt">Select Student</label>
            <select
              name="studentsEnroll"
              value={user.studentsEnroll}
              onChange={handleChange}
              className="custom-select"
            >
              {" "}
              {studentList.map((students) => (
                <option key={students._id} value={students._id}>{students.name}</option>
              ))}
            </select>
          </div> */}
          <div className="input-control add-expense-btn">
            <Button type="submit">Create New Class</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ClassRecordForm;
