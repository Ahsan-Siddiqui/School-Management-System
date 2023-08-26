import React, { useState, useEffect } from "react";
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
const AssignTeacherClass = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [classIds, setClassId] = useState([]);

  const [selectedClass, setSelectedClass] = useState(""); // Added state for selected class
  const [selectedClassStudents, setSelectedClassStudents] = useState([]); // Added state for selected class students

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
  useEffect(() => {
    // GET Class as assign to teacher by Admin
    axios
      .get(
        `http://localhost:8080/api/getTimetableDetails/teacher/${users.userDetail.id}`,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setClassId(response.data);
      })
      .catch((error) =>
        console.error("Error fetching teacher time table:", error)
      );
    // GET ASSIGNED STUDENTS based on selected class
    if (selectedClass) {
      console.log("chekccinggg", selectedClass);
      axios
        .get(
          `http://localhost:8080/api/attendance/students/${selectedClass.id}`,
          {
            headers: {
              Authorization: authToken,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setSelectedClassStudents(response.data);
        })
        .catch((error) => console.error("Error fetching student list:", error));
    }
  }, [authToken, selectedClass]);

  const handleCheckboxChange = (e, firstname) => {
    const { value, checked } = e.target;
    if (checked) {
      setUser((prevUser) => ({
        ...prevUser,
        presentStudent: [
          ...prevUser.presentStudent,
          {
            id: value,
            name: firstname,
            presentText: "Present", // Set the default present text
            absentText: "Absent",   // Set the default absent text
          },
        ],
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        presentStudent: prevUser.presentStudent.filter(
          (student) => student.id !== value
        ),
      }));
    }
  };
  
  const handleStudentCheckboxToggle = (studentId, firstname,presentText) => () => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents((prevSelectedStudents) =>
        prevSelectedStudents.filter((id) => id !== studentId)
      );
      setUser((prevUser) => ({
        ...prevUser,
        presentStudent: prevUser.presentStudent.filter(
          (student) => student.id !== studentId
        ),
      }));
    } else {
      setSelectedStudents((prevSelectedStudents) => [
        ...prevSelectedStudents,
        studentId,
      ]);
      setUser((prevUser) => ({
        ...prevUser,
        presentStudent:  [
          ...prevUser.presentStudent,
          { id: studentId, name: firstname,present:"Present" },
        ],
      }));
    }
  };
  const [user, setUser] = useState({
    gradeName: "",
    schedule: "",
    presentStudent: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "gradeName") {
      setSelectedClass(value.gradeName); // Update the selected class

      // Create an array of student objects with their IDs and names
      const selectedStudentsInfo = selectedClassStudents.map((student) => ({
        id: student._id,
        firstname: student.firstname,
        lastname: student.lastname,
      }));

      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
        presentStudent: selectedStudentsInfo, // Update the presentStudent array
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };
  const TakeAttendance = async (e) => {
    e.preventDefault();

    // Check if at least one teacher is selected
    if (user.presentStudent.length === 0) {
      setToastSeverity("error");
      setToastMessage("Please select at least one Student.");
      setToastOpen(true);
      return; // Prevent further execution
    }
    try {
      const { gradeName, schedule, presentStudent } = user;

      const authToken = users.saveToken;
      const presentStudents = presentStudent.filter(
        (student) => student.presentText === "Present"
      );
      const absentStudents = presentStudent.filter(
        (student) => student.presentText === "Absent"
      );
    
      const presentStudentData = presentStudents.map((student) => ({
        id: student._id,
        name: student.firstname,
      }));
    
      const absentStudentData = absentStudents.map((student) => ({
        id: student._id,
        name: student.firstname,
      }));
      const response = await axios
        .post(
          "http://localhost:8080/api/attendance",
          {
            gradeName,
            schedule,
            presentStudents: presentStudentData,
            absentStudents: absentStudentData,
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
            history.push("/attendance");
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

  return (
    <div className="commonFormContainer">
      {console.log(user)}
      <h1>Attendance Mark</h1>
      <Card className="commonForm">
        <form onSubmit={TakeAttendance}>
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
              {classIds.map((item) => (
                <MenuItem key={item._id} value={item}>
                  {item.gradeName.name}
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
    value={selectedStudents}
    onChange={handleCheckboxChange}
    input={<Input />}
    renderValue={(selected) => `${selected.length} students selected`}
  >
    {selectedClassStudents.map((student) => (
      <MenuItem key={student._id} value={student._id}>
        <Checkbox
          checked={selectedStudents.includes(student._id)}
          onChange={handleStudentCheckboxToggle(
            student._id,
            student.firstname,
            student.presentText // Pass the presentText value
          )}
        />
        <ListItemText
          primary={student.firstname}
          secondary={student.presentText} 
        />
      </MenuItem>
    ))}
  </Select>
          </FormControl>

          <div className="input-control add-expense-btn">
            <Button type="submit">Save</Button>
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

export default AssignTeacherClass;
