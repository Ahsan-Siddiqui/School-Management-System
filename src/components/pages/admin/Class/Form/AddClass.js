import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Button,
  Snackbar,
  Slide,
  Container,
} from "@mui/material";
import './addClass.css'
//for toast
import Alert from "@mui/material/Alert";

const AddClass = () => {
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
  // State variables for toast notifications

  const [classInfo, setClassInfo] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassInfo({
      ...classInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/api/createClass", classInfo, {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setToastSeverity("success");
          setToastMessage(res.data.msg);
          setToastOpen(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
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
    <Container className="add-class-container">
      <div className="AddClass">
        <h1 className="heading">New Class</h1>
        <div>
          <Box sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="title">Class Number</InputLabel>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={classInfo.title}
                  onChange={handleChange}
                  placeholder="Class -"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                <InputLabel htmlFor="description">Class Description</InputLabel>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={classInfo.description}
                  onChange={handleChange}
                  placeholder="Enter Class Description"
                />
              </FormControl>
              <div className="input-control add-expense-btn">
                <Button type="submit">Add Class</Button>
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
          </Box>
        </div>
      </div>
    </Container>
  );
};
export default AddClass;
