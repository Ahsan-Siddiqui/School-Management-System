import React, { useState, useEffect } from "react";
import {
  TextField,
  TextareaAutosize,
  Button,
  Container,
  Card,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Snackbar,
  Slide,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Alert from "@mui/material/Alert";
const CreateAssignmentForm = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [instructions, setInstructions] = useState("");
  const [classIds, setClassId] = useState([]);

  useEffect(() => {
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
  }, [authToken]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send in the request
    const assignmentData = {
      gradeName: {
        id: user.gradeId, // Use the extracted grade ID
        name: user.gradeName, // Use the extracted grade name
      },
      title: user.title,
      description: user.description,
      dueDate: user.dueDate,
      instructions: user.instructions,
    };
    // console.log(assignmentData)
    // Send POST request to create assignment
    axios
      .post("http://localhost:8080/api/assignments", assignmentData, {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Display success message
        setToastSeverity("success");
        setToastMessage(response.data.msg);
        setToastOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error creating assignment:", error);
        setToastMessage(error.response.data.msg);
        // Display error message
        setToastSeverity("error");
        setToastOpen(true);
      });
  };
  const [user, setUser] = useState({
    gradeName: "",
    gradeId: "", // Add this field
    title: "",
    description: "",
    dueDate: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the selected value is an object (class data)
    if (typeof value === "object" && value !== null) {
      // Extract and set the grade name and ID from the selected class
      setUser({
        ...user,
        gradeName: value.gradeName.name,
        gradeId: value.gradeName.id,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
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
    <Container maxWidth="sm">
      {console.log(user)}
      <Card className="commonForm">
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mt: 2, width: "100%" }}>
            <InputLabel htmlFor="gradeName" sx={{ mt: -2 }}>
              Select Class
            </InputLabel>

            <Select
              sx={{ p: 0 }}
              name={user.gradeName}
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
          <TextField
            label="Assignment Title"
            variant="outlined"
            fullWidth
            name="title"
            value={user.title}
            style={{ width: "100%", marginTop: "10px" }}
            onChange={handleChange}
          />
          <TextareaAutosize
            aria-label="Assignment Description"
            placeholder="Assignment Description"
            minRows={3}
            style={{ width: "100%", marginTop: "10px" }}
            name="description"
            value={user.description}
            onChange={handleChange}
          />
          <FormControl sx={{ mt: 4, width: "100%" }}>
            <InputLabel htmlFor="dueDate">Select Submission Date</InputLabel>
            <Input
              type="text"
              name="dueDate"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={user.dueDate}
            />
          </FormControl>

          <TextareaAutosize
            aria-label="Additional Instructions"
            placeholder="Additional Instructions"
            minRows={2}
            name="instructions"
            style={{ width: "100%", marginTop: "10px" }}
            value={user.instructions}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Create Assignment
          </Button>
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
    </Container>
  );
};

export default CreateAssignmentForm;
