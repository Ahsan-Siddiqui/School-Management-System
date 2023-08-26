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
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Grid,
} from "@mui/material";
import Alert from "@mui/material/Alert";
const TimetableForm = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [findClassList, setClassList] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState([]);

  const [selectedDays, setSelectedDays] = useState([]);
  const [user, setUser] = useState({
    gradeName: "",
    teacherAssign: "",
    selectSubject: "",
    selectedDays: [],
    selectedTimeSlot: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "teacherAssign") {
      const selectedTeachers = selectedTeacher.find(
        (teacher) => teacher.userId === value
      );
  
      setUser((prevUser) => ({
        ...prevUser,
        teacherAssign: value,
        teacherName: selectedTeachers ? selectedTeachers.firstname : "",
      }));
    }
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
        console.log(response.data)
        setSelectedTeacher(response.data); // Update the selectedTeacher state with response data
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

    // GET Subject request
    axios
      .get("http://localhost:8080/api/createSubject", {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSelectedSubject(response.data.Subjects);
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
        selectedDays: e.target.value,

        [name]: prevUser[name].filter((id) => id !== value),
      }));
    }
  };
  const handleStudentCheckboxToggle = (dayId) => () => {
    setUser((prevUser) => {
      const updatedSelectedDays = prevUser.selectedDays.includes(dayId)
        ? prevUser.selectedDays.filter((id) => id !== dayId)
        : [...prevUser.selectedDays, dayId];

      return {
        ...prevUser,
        selectedDays: updatedSelectedDays,
      };
    });
  };
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "8:00 AM - 9:30 AM",
    "9:30 AM - 10:30 AM",
    "10:30 AM - 11:30 AM",
    "11:30 AM - 12:40 PM",
  ];

  const handleSaveTimetable = async (e) => {
    e.preventDefault();

    try {
      const {
        gradeName,
        teacherAssign,
        selectSubject,
        selectedDays,
        selectedTimeSlot
      } = user;

      const authToken = users.saveToken;

      const response = await axios
        .post(
          "http://localhost:8080/api/createTimetable",
          {
            gradeName: {
              name: gradeName,
              id: user.classId, // Use the stored teacher name
            },
             teacherAssign: {
            id: teacherAssign,
            name: user.teacherName, // Use the stored teacher name
          },
            selectSubject,
            selectedDays,
            selectedTimeSlot
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
            history.push("/time-table");
            window.location.reload();
          }, 1000);
        });
    } catch (error) {
      // Handle errors here
      if (error.response) {
        console.log(error.response);
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
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#dddddd",
        fontWeight: "bold",
        textAlign: "center",
        padding: 2,
      }}
    >
      {console.log(user)}
      <Typography variant="h5" align="center" gutterBottom>
        Time Table
      </Typography>
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
        <InputLabel htmlFor="teacherAssign" sx={{ mt: -2 }}>
          Select Teacher
        </InputLabel>
        <Select
          sx={{ p: 0 }}
          name="teacherAssign"
          // name={user.teacherAssign.firstname}
          value={user.teacherAssign.id} // Change this line

          onChange={handleChange}
          className="custom-select"
        >
          {selectedTeacher.map((teachers) => (
            <MenuItem key={teachers._id} value={teachers.userId}>
              {teachers.firstname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ mt: 3, width: "100%" }}>
        <InputLabel htmlFor="selectedDays">Select Day</InputLabel>
        <Select
          name="selectedDays"
          multiple
          value={user.selectedDays}
          onChange={handleCheckboxChange}
          input={<Input />}
          renderValue={(selected) => `${selected.length} selected Days`}
        >
          {daysOfWeek.map((day) => (
            <MenuItem key={day} value={day}>
              <Checkbox
                checked={user.selectedDays.includes(day)}
                onChange={handleStudentCheckboxToggle(day)}
              />
              <ListItemText primary={day} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ mt: 4, width: "100%" }}>
        <InputLabel htmlFor="selectSubject" sx={{ mt: -2 }}>
          Select Subject
        </InputLabel>
        <Select
          sx={{ p: 0 }}
          name="selectSubject"
          value={user.selectSubject}
          onChange={handleChange}
          className="custom-select"
        >
          {selectedSubject.map((subject) => (
            <MenuItem key={subject._id} value={subject.title}>
              {subject.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ mt: 4, width: "100%" }}>
        <InputLabel htmlFor="selectedTimeSlot" sx={{ mt: -2 }}>
          Select Time
        </InputLabel>
        <Select
          sx={{ p: 0 }}
          name="selectedTimeSlot"
          value={user.selectedTimeSlot}
          onChange={handleChange}
          className="custom-select"
        >
          {timeSlots.map((subTime) => (
            <MenuItem key={subTime} value={subTime}>
              {subTime}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container justifyContent="flex-end">
        <Button
          onClick={handleSaveTimetable}
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Save
        </Button>
      </Grid>
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
    </Container>
  );
};

export default TimetableForm;
