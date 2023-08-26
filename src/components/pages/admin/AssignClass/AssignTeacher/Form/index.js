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
  const [teacherList, setTeacherList] = useState([]);
  const [assignedTeachers, setAssignedTeachers] = useState([]);
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
    // GET Assigned teacherId from List
    axios
    .get("http://localhost:8080/api/teacherForm", {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const teachersFromForm = response.data;

      axios
        .get("http://localhost:8080/api/assignSClass", {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const teachersFromList = response.data.flatMap((cls) =>
            cls.teachersEnroll
          );

          // Filter out Teachers that are already assigned
          const unassignedTeachers = teachersFromForm.filter(
            (teacher) => !teachersFromList.includes(teacher._id)
          );

          setTeacherList(unassignedTeachers);
        });
    })
    .catch((error) => console.error("Error fetching teacher list:", error));

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
        teachersEnroll: e.target.value,

        [name]: prevUser[name].filter((id) => id !== value),
      }));
    }
  };
  const handleTeacherCheckboxToggle = (teacherId) => () => {
    const updatedTeachersEnroll = user.teachersEnroll.includes(teacherId)
      ? user.teachersEnroll.filter((id) => id !== teacherId)
      : [...user.teachersEnroll, teacherId];

    setUser((prevUser) => ({
      ...prevUser,
      teachersEnroll: updatedTeachersEnroll,
    }));

    setAssignedTeachers((prevAssignedTeachers) =>
      updatedTeachersEnroll.includes(teacherId)
        ? [...prevAssignedTeachers, teacherId]
        : prevAssignedTeachers.filter((id) => id !== teacherId)
    );
  };

  const [user, setUser] = useState({
    gradeName: "",
    schedule: "",
    teachersEnroll: [],
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
  const TeacherRegister = async (e) => {
    e.preventDefault();
// Check if at least one teacher is selected
if (user.teachersEnroll.length === 0) {
  setToastSeverity("error");
  setToastMessage("Please select at least one teacher.");
  setToastOpen(true);
  return; // Prevent further execution
}
    try {
      const { gradeName, schedule, teachersEnroll } = user;

      const authToken = users.saveToken;

      const response = await axios
        .post(
          "http://localhost:8080/api/assignTClass",
          {
            gradeName: {
              name: gradeName,
              id: user.classId, // Use the stored teacher name
            },
            schedule,
            teachersEnroll,
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
            history.push("/assign-teacher");
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
      <h1>Assign Teachers</h1>
      <Card className="commonForm">
        <form onSubmit={TeacherRegister}>
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
            <Input
              type="date"
              name="schedule"
              onChange={handleChange}
              value={user.schedule}
              placeholder="Enter Date and Time"
            />
          </FormControl>

          <FormControl sx={{ mt: 3, width: "100%" }}>
            <InputLabel htmlFor="teachersEnroll">Select Teachers</InputLabel>
            <Select
              name="teachersEnroll"
              multiple
              value={user.teachersEnroll}
              onChange={handleCheckboxChange}
              input={<Input />}
              renderValue={(selected) => `${selected.length} teachers selected`}
            >
              {teacherList.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  <Checkbox
                    checked={user.teachersEnroll.includes(teacher._id)}
                    onChange={handleTeacherCheckboxToggle(teacher._id)}
                  />
                  <ListItemText primary={teacher.firstname} />
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

export default AssignTeacherClass;
