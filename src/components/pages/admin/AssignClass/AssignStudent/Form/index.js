import React, { useState, useEffect } from "react";
import axios from "axios";
import "./studentForm.css";
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
const AssignStudentClass = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [studentList, setStudentList] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
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
    // GET Assigned studentId from List
    axios
    .get("http://localhost:8080/api/studentForm", {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const studentsFromForm = response.data;

      axios
        .get("http://localhost:8080/api/assignSClass", {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const studentsFromList = response.data.flatMap((cls) =>
            cls.studentsEnroll
          );

          // Filter out students that are already assigned
          const unassignedStudents = studentsFromForm.filter(
            (student) => !studentsFromList.includes(student._id)
          );

          setStudentList(unassignedStudents);
        });
    })
    .catch((error) => console.error("Error fetching student list:", error));

    // GET STUDENTS request
    // axios
    //   .get("http://localhost:8080/api/studentForm", {
    //     headers: {
    //       Authorization: authToken,
    //       "Content-Type": "application/json", // Set the Content-Type header
    //     },
    //   })
    //   .then((response) => {
    //     setStudentList(response.data); // Update the studentList state with response data
    //   })
    //   .catch((error) => console.error("Error fetching student list:", error));

    // GET CLASSE request
    axios
      .get("http://localhost:8080/api/createClass", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.classes)
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
    const updatedStudentsEnroll = user.studentsEnroll.includes(studentId)
      ? user.studentsEnroll.filter((id) => id !== studentId)
      : [...user.studentsEnroll, studentId];

    setUser((prevUser) => ({
      ...prevUser,
      studentsEnroll: updatedStudentsEnroll,
    }));

    setAssignedStudents((prevAssignedStudents) =>
      updatedStudentsEnroll.includes(studentId)
        ? [...prevAssignedStudents, studentId]
        : prevAssignedStudents.filter((id) => id !== studentId)
    );
    

  };

  const [user, setUser] = useState({
    gradeName: "",
    schedule: "",
    studentsEnroll: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "gradeName") {
      const selectedClass = findClassList.find(
        (cName) => cName.title === value
      );
      setUser((prevUser) => ({
        ...prevUser,
        gradeName: value,
        classId: selectedClass ? selectedClass._id : "",
      }));
    } 
      else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };
  
  
  const StudentRegister = async (e) => {
    e.preventDefault();
// Check if at least one student is selected
if (user.studentsEnroll.length === 0) {
  setToastSeverity("error");
  setToastMessage("Please select at least one student.");
  setToastOpen(true);
  return; // Prevent further execution
}
    try {
      const { gradeName, schedule, studentsEnroll } = user;

      const authToken = users.saveToken;

      const response = await axios
        .post(
          "http://localhost:8080/api/assignSClass",
          {
            gradeName: {
              name: gradeName,
              id: user.classId, // Use the stored teacher name
            },
            schedule,
            studentsEnroll,
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
            history.push("/assign-student");
            window.location.reload();
          }, 2000);
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
//Date Lable Setting
const handleFocus = (e) => {
  e.currentTarget.type = "date";
  e.currentTarget.click();
};

const handleBlur = (e) => {
  if (!e.currentTarget.value) {
      e.currentTarget.type = "text";
  }
};
  return (
    <div className="commonFormContainer">
      <h1>Assign Students</h1>
      <Card className="commonForm">
        <form onSubmit={StudentRegister}>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel htmlFor="gradeName" sx={{ mt: -2 }}>
              Select Class
            </InputLabel>
            <Select
              sx={{ p: 0 }}
              name="gradeName"
              value={user.title}
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

          <FormControl sx={{ mt: 4, width: "100%" }}>
          <InputLabel htmlFor="schedule">Student Assign Date</InputLabel>
            <Input
              type="text"
              name="schedule"
              onFocus={handleFocus}
              onBlur={handleBlur}
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
            <Button type="submit">Assign Class</Button>
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

export default AssignStudentClass;
