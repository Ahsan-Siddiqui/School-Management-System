import React, { useState, useEffect } from "react";
import "./classForm.css"; // Import your CSS file
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Card,
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Snackbar,
  Slide,
} from "@mui/material";
import Alert from "@mui/material/Alert";
const AssignClass = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [findClassList, setClassList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  // State variables for toast notifications
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const handleToastClose = () => {
    setToastOpen(false);
  };
  const SlideTransition = (props) => {
    return <Slide {...props} direction="down" />;
  };
  // State variables for toast notifications
  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };
  useEffect(() => {
    // GET TEACHER request
    axios
      .get("http://localhost:8080/api/teacherForm", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json", // Set the Content-Type header
        },
      })
      .then((response) => {
        setTeacherList(response.data); // Update the teacherList state with response data
      })
      .catch((error) => console.error("Error fetching teacher list:", error));

    // GET STUDENTS request
    axios
      .get("http://localhost:8080/api/studentForm", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json", // Set the Content-Type header
        },
      })
      .then((response) => {
        setStudentList(response.data); // Update the studentList state with response data
      })
      .catch((error) => console.error("Error fetching student list:", error));

    // GET CLASSE request
    axios
      .get("http://localhost:8080/api/createClass", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setClassList(response.data.classes);
      })
      .catch((error) => console.error("Error fetching teacher list:", error));
  }, [authToken]);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: [...prevUser[name], value],
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        studentsEnroll: e.target.value,

        [name]: prevUser[name].filter((id) => id !== value),
      }));
    }
  };
  const handleStudentCheckboxToggle = (studentId) => () => {
    setUser((prevUser) => {
      const updatedStudentsEnroll = prevUser.studentsEnroll.includes(studentId)
        ? prevUser.studentsEnroll.filter((id) => id !== studentId)
        : [...prevUser.studentsEnroll, studentId];
  
      return {
        ...prevUser,
        studentsEnroll: updatedStudentsEnroll,
      };
    });
  };
  
  const [user, setUser] = useState({
    gradeName: "",
    weekDay: "",
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
        weekDay,
        teacherAssign,
        schedule,
        studentsEnroll,
        room,
      } = user;

      const authToken = users.saveToken;

      const response = await axios
        .post(
          "http://localhost:8080/api/classes",
          {
            gradeName,
            weekDay,
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
        )
        .then((response) => {
          setToastSeverity("success");
          setToastMessage(response.data.msg);
          setToastOpen(true);
          setTimeout(() => {
            history.push("/class");
            window.location.reload();
          }, 1000);
        });
    } catch (error) {
      // Handle errors here
      if (error.response) {
        setToastSeverity("error");
        setToastMessage(error.response.data.msg);
        setToastOpen(true);
      } else {
        setToastSeverity("error");
        setToastMessage("Server not Connected");
        setToastOpen(true);
      }
    }
  };

  return (
    <div className="commonFormContainer">
      <h1>Create New Class</h1>
      <Card className="commonForm">
        <form onSubmit={UserRegister}>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel htmlFor="gradeName" sx={{ mt: -2 }}>
              Select Class
            </InputLabel>
            <Select
              sx={{ p: 0 }}
              name="gradeName"
              value={user.gradeName}
              onChange={handleChange}
              className="custom-select"
            >
              {findClassList.map((classN) => (
                <MenuItem key={classN._id} value={classN.title}>
                  {classN.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel htmlFor="weekDay">Week Days</InputLabel>
            <Input
              type="text"
              name="weekDay"
              onChange={handleChange}
              value={user.weekDay}
              placeholder="Enter Day Name"
            />
          </FormControl>

          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel htmlFor="room">Room Number</InputLabel>
            <Input
              type="text"
              name="room"
              onChange={handleChange}
              value={user.room}
              placeholder="Enter Room Number"
            />
          </FormControl>

          <FormControl sx={{ mt: 4, width: "100%" }}>
            <InputLabel htmlFor="teacherAssign" sx={{ mt: -2 }}>
              Select Teacher
            </InputLabel>
            <Select
              sx={{ p: 0 }}
              name="teacherAssign"
              value={user.teacherAssign}
              onChange={handleChange}
              className="custom-select"
            >
              {teacherList.map((teachers) => (
                <MenuItem key={teachers._id} value={teachers._id}>
                  {teachers.firstname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 4, width: "100%" }}>
            <Input
              type="date"
              name="schedule"
              onChange={handleChange}
              value={user.schedule}
              placeholder="Enter Date and Time"
            />
          </FormControl>

          <FormControl sx={{ mt: 3, width: "100%" }}>
            <InputLabel htmlFor="studentsEnroll">Select Students</InputLabel>
            <Select
              name="studentsEnroll"
              multiple
              value={user.studentsEnroll}
              onChange={handleCheckboxChange}
              input={<Input />}
              renderValue={(selected) => `${selected.length} students selected`}
            >
              {studentList.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  <Checkbox
                    checked={user.studentsEnroll.includes(student._id)}
                    onChange={handleStudentCheckboxToggle(student._id)}
                  />
                  <ListItemText primary={student.firstname} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="input-control add-expense-btn">
            <Button type="submit">Create New Class</Button>
          </div>
          <Snackbar
            open={toastOpen}
            autoHideDuration={6000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={SlideTransition}
          >
            <Alert onClose={handleToastClose} severity={toastSeverity}>
              {toastMessage}
            </Alert>
          </Snackbar>
        </form>
      </Card>
    </div>
  );
};

export default AssignClass;
