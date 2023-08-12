import React, { useState, useEffect } from "react";
import "./studentForm.css"; // Import your CSS file
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Card from "../../../ui/card";
const StudentForm = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [user, setUser] = useState({
    //Personal Info
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    contactNo: "",
    email: "",
    address: "",
    //Parents Gardian Info
    parntGardInfo: "",
    parntGardName: "",
    relation: "",
    parntGardNumber: "",
    parntGardEmail: "",
    parntGardAddress: "",
    //Class Info
    classGrade: "",
    section: "",
    rollNo: "",
    enrollDate: "",
    addmissionNumber: "",
    profilePic: null,
    emergancyContact: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const StudentAssign = async (e) => {
    e.preventDefault();
    // if (
    //   !user.firstname ||
    //   !user.lastname ||
    //   !user.gender ||
    //   !user.parntGardName ||
    //   !user.classGrade ||
    //   !user.section ||
    //   !user.rollNo ||
    //   !user.enrollDate
    // ) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/Student",
        user,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.msg);
      console.log(response);
      history.push("/student");
      window.location.reload();
    } catch (error) {
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
      <h1>Add New Students</h1>
      <Card className="commonForm">
        <form onSubmit={StudentAssign} encType="multipart/form-data">
          <h3
            style={{
              textAlign: "left",
              fontWeight: "bold",
              backgroundColor: "#333",
              color: "white",
              padding: 10,
              fontFamily: "serif",
            }}
          >
            Student Detail
          </h3>
          <div className="row">
            <div className="input-control col-md-6">
              <label htmlFor="firstname">Enter First Name (required)</label>
              <input
                type="firstname"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
                placeholder="Enter First Name "
              />
            </div>
            <div className="input-control col-md-6">
              <label htmlFor="lastname">Enter Last Name (required)</label>
              <input
                type="lastname"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-control col-md-3">
              <label htmlFor="dob">Enter Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                placeholder="Enter Date Of Birth"
              />
            </div>
            <div className="input-control col-md-3">
              <label htmlFor="gender">Select Gender (required)</label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="custom-select"
                placeholder="Enter Student Gender"
              >
                <option value="" name="">
                  Select Option
                </option>
                <option value="male" name="male">
                  Male
                </option>
                <option value="female" name="female">
                  Female
                </option>
              </select>
            </div>
            <div className="input-control col-md-6">
              <label htmlFor="contactNo">Enter Student Personal Number</label>
              <input
                type="number"
                name="contactNo"
                value={user.contactNo}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-control col-md-4">
              <label htmlFor="email">Enter Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter Student Email"
              />
            </div>
            <div className="input-control col-md-8">
              <label htmlFor="address">Enter Address</label>
              <input
                type="address"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter Student Address"
              />
            </div>
          </div>
          <h3
            style={{
              textAlign: "left",
              fontWeight: "bold",
              backgroundColor: "#333",
              color: "white",
              padding: 10,
              fontFamily: "serif",
            }}
          >
            Guardian Detail
          </h3>

          <div className="row">
            <div className="input-control col-md-12">
              <label htmlFor="parntGardInfo">Enter Parent / Gardian Info</label>
              <input
                type="parntGardInfo"
                name="parntGardInfo"
                value={user.parntGardInfo}
                onChange={handleChange}
                placeholder="Enter Student Parent / Guardian Info"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-control col-md-4">
              <label htmlFor="parntGardName">
                Enter Parent / Gaurdian Name (required)
              </label>
              <input
                type="parntGardName"
                name="parntGardName"
                value={user.parntGardName}
                onChange={handleChange}
                placeholder="Parent / Guardian Name "
              />
            </div>
            <div className="input-control col-md-4">
              <label htmlFor="relation">Enter Relation</label>
              <input
                type="relation"
                name="relation"
                value={user.relation}
                onChange={handleChange}
                placeholder="Relation with Parent / Guardian"
              />
            </div>
            <div className="input-control col-md-4">
              <label htmlFor="parntGardNumber">
                Enter Parent / Guardian Contact Number
              </label>
              <input
                type="number"
                name="parntGardNumber"
                value={user.parntGardNumber}
                onChange={handleChange}
                placeholder="Parent / Guardian Contact Number"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-control col-md-4">
              <label htmlFor="parntGardEmail">
                Enter Parent / Guardian Email
              </label>
              <input
                type="parntGardEmail"
                name="parntGardEmail"
                value={user.parntGardEmail}
                onChange={handleChange}
                placeholder="Enter Student Parent / Guardian Email"
              />
            </div>
            <div className="input-control col-md-8">
              <label htmlFor="parntGardAddress">
                Enter Parent / Guardian Address
              </label>
              <input
                type="parntGardAddress"
                name="parntGardAddress"
                value={user.parntGardAddress}
                onChange={handleChange}
                placeholder="Enter Student Parent / Guardian Address"
              />
            </div>
          </div>
          <h3
            style={{
              textAlign: "left",
              fontWeight: "bold",
              backgroundColor: "#333",
              color: "white",
              padding: 10,
              fontFamily: "serif",
            }}
          >
            Class Detail
          </h3>
          <div className="row">
            <div className="input-control col-md-4">
              <label htmlFor="classGrade">Enter Student Class (required)</label>
              <input
                type="classGrade"
                name="classGrade"
                value={user.classGrade}
                onChange={handleChange}
                placeholder="Enter class / Grade"
              />
            </div>
            <div className="input-control col-md-4">
              <label htmlFor="section">Enter Section (required)</label>
              <select
                name="section"
                value={user.section}
                onChange={handleChange}
                className="custom-select"
                placeholder="Enter class section"
              >
                <option value="" name="">
                  Select Option
                </option>
                <option value="Section-A" name="Section-A">
                  Section-A
                </option>
                <option value="Section-B" name="Section-B">
                  Section-B
                </option>
                <option value="Section-C" name="Section-C">
                  Section-C
                </option>
              </select>
            </div>
            <div className="input-control col-md-4">
              <label htmlFor="rollNo">Student Roll Number (required)</label>
              <input
                type="rollNo"
                name="rollNo"
                value={user.rollNo}
                onChange={handleChange}
                placeholder="Enter Roll number"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-control col-md-4">
              <label htmlFor="enrollDate">
                Enter Student Enroll Date (required)
              </label>
              <input
                type="date"
                name="enrollDate"
                value={user.enrollDate}
                onChange={handleChange}
                placeholder="Enter Enroll Date"
              />
            </div>
            <div className="input-control col-md-4">
              <label htmlFor="addmissionNumber">
                Enter Student Admission Number
              </label>
              <input
                type="addmissionNumber"
                name="addmissionNumber"
                value={user.addmissionNumber}
                onChange={handleChange}
                placeholder="Enter Admission Number"
              />
            </div>
            <div className="input-control col-md-4">
              <label htmlFor="emergancyContact">
                Enter Emergency Contact Number (required)
              </label>
              <input
                type="number"
                name="emergancyContact"
                value={user.emergancyContact}
                onChange={handleChange}
                placeholder="Emergency Contact"
              />
            </div>
          </div>
          <div className="input-control">
            <label htmlFor="profilePic">Enter Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              onChange={(e) =>
                setUser({ ...user, profilePic: e.target.files[0] })
              } // Handle file selection
              placeholder="Upload Profile Picture"
            />
          </div>

          <div className="input-control add-expense-btn">
            <Button type="submit">Create New Student</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StudentForm;
