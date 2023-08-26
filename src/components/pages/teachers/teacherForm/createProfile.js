import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Input,
  Typography,
  Snackbar,
  Slide,
} from "@mui/material";
import Alert from "@mui/material/Alert";

const TeacherForm = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [profileId, setProfileId] = useState();
  const [teacheerDetail, setTeacherDetail] = useState();

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
  const [user, setUser] = useState({
    //Personal Info
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    contactNo: "",
    email: "",
    address: "",
    //Education Info
    eduBackground: "",
    experience: "",
    degree: "",
    enrollDate: "",
    profilePic: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/teacherForm/${profileId}`, {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setProfileId(response.data[0]._id);
          setTeacherDetail(response.data);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.msg) {
          setToastSeverity("error");
          setToastMessage(error.response.data.msg);
          setToastOpen(true);
        } else {
          setToastSeverity("error");
          setToastMessage("Server not Connected");
          setToastOpen(true);
        }
      });
  }, [authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (teacheerDetail && Array.isArray(teacheerDetail)) {
      const updatedTeacherDetail = [...teacheerDetail];
      updatedTeacherDetail[0][name] = value;
      setTeacherDetail(updatedTeacherDetail);
    }
    else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };
  const updateTeacherProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/teacherForm/${profileId}`,
        teacheerDetail[0],
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      setToastSeverity("success");
      setToastMessage(response.data.msg);
      setToastOpen(true);
      setTimeout(() => {
        history.push("/profile");
      }, 2000);
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

  const TeacherAssign = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/teacherForm`,
        user,
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );
      setToastSeverity("success");
      setToastMessage(response.data.msg);
      setToastOpen(true);
      setTimeout(() => {
        history.push("/profile");
      }, 2000);
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
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setUser((prevUser) => ({
        ...prevUser,
        Tsubjects: [...prevUser.Tsubjects, value],
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        Tsubjects: prevUser.Tsubjects.filter((subject) => subject !== value),
      }));
    }
  };

  const subjectOptions = [
    { name: "english", value: "english", label: "English" },
    { name: "urdu", value: "urdu", label: "Urdu" },
    { name: "Islamiat", value: "Islamiat", label: "Islamiat" },
    { name: "Math", value: "Math", label: "Math" },
    { name: "Physics", value: "Physics", label: "Physics" },
    { name: "Chemistry", value: "Chemistry", label: "Chemistry" },
    { name: "Drawing", value: "Drawing", label: "Drawing" },
    // Add more options as needed
  ];
  const dobDate     = teacheerDetail ? teacheerDetail[0].dob : user.dob;
  const enrollDate  = teacheerDetail ? teacheerDetail[0].enrollDate : user.enrollDate;
  const formattedDob = dobDate ? new Date(dobDate).toISOString().split("T")[0] : "";
  const formattedenrollDate = enrollDate ? new Date(enrollDate).toISOString().split("T")[0] : "";

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        {profileId ? "Update Profile" : "Create Profile"}
      </Typography>
      <Paper elevation={5} sx={{ p: 3 }}>
        <form onSubmit={profileId ? updateTeacherProfile : TeacherAssign}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              backgroundColor: "#333",
              color: "white",
              padding: 2,
              fontFamily: "serif",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            Teacher Detail
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="firstname">
                  Enter First Name (required)
                </InputLabel>
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={
                    teacheerDetail
                      ? teacheerDetail[0].firstname
                      : user.firstname
                  }
                  onChange={handleChange}
                  disabled={!!profileId}
                  placeholder="Enter First Name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="lastname">
                  Enter Last Name (required)
                </InputLabel>
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={
                    teacheerDetail ? teacheerDetail[0].lastname : user.lastname
                  }
                  onChange={handleChange}
                  disabled={!!profileId}
                  placeholder="Enter Last Name"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="dob"></InputLabel>
                <Input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formattedDob}
                  onChange={handleChange}
                  placeholder="Enter Date Of Birth"
                  inputProps={{
                    "aria-label": "Date of Birth",
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="gender">
                  Select Gender (required)
                </InputLabel>
                <Select
                  name="gender"
                  value={
                    teacheerDetail ? teacheerDetail[0].gender : user.gender
                  }
                  onChange={handleChange}
                  label="Select Gender (required)"
                  inputProps={{
                    "aria-label": "Gender",
                  }}
                >
                  <MenuItem value="">Select Option</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="contactNo">
                  Enter Personal Number
                </InputLabel>
                <Input
                  type="number"
                  name="contactNo"
                  id="contactNo"
                  value={
                    teacheerDetail
                      ? teacheerDetail[0].contactNo
                      : user.contactNo
                  }
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="email">Enter Email</InputLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={teacheerDetail ? teacheerDetail[0].email : user.email}
                  onChange={handleChange}
                  placeholder="Enter Student Email"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="address">Enter Address</InputLabel>
                <Input
                  type="address"
                  name="address"
                  id="address"
                  value={
                    teacheerDetail ? teacheerDetail[0].address : user.address
                  }
                  onChange={handleChange}
                  placeholder="Enter Student Address"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              backgroundColor: "#333",
              color: "white",
              padding: 2,
              fontFamily: "serif",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            Education Detail
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="parntGardName">
                  Education Background (required)
                </InputLabel>
                <Input
                  type="text"
                  name="eduBackground"
                  id="eduBackground"
                  value={
                    teacheerDetail
                      ? teacheerDetail[0].eduBackground
                      : user.eduBackground
                  }
                  onChange={handleChange}
                  placeholder="Your Education Background"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="experience">Enter Experience</InputLabel>
                <Input
                  type="text"
                  name="experience"
                  id="experience"
                  value={
                    teacheerDetail
                      ? teacheerDetail[0].experience
                      : user.experience
                  }
                  onChange={handleChange}
                  placeholder="Enter Your Year Of Experience"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="standard" sx={{ marginTop: 0.8 }}>
                <InputLabel htmlFor="degree">Enter Your Degree</InputLabel>
                <Input
                  type="text"
                  name="degree"
                  id="degree"
                  value={
                    teacheerDetail ? teacheerDetail[0].degree : user.degree
                  }
                  onChange={handleChange}
                  placeholder="Your Degree Name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="enrollDate"></InputLabel>
                <Input
                  type="date"
                  name="enrollDate"
                  id="enrollDate"
                  value={formattedenrollDate}
                  onChange={handleChange}
                  placeholder="Enter Date Of Birth"
                  inputProps={{
                    "aria-label": "Date of Birth",
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>

          <FormControl fullWidth variant="standard" sx={{ marginBottom: 1 }}>
            <Input
              type="file"
              name="profilePic"
              inputProps={{ accept: "image/*" }}
              onChange={(e) =>
                setUser({ ...user, profilePic: e.target.files[0] })
              }
            />
          </FormControl>
          <Grid container justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary">
              {profileId ? "Update Profile" : "Create New Student"}
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
        </form>
      </Paper>
    </Container>
  );
};

export default TeacherForm;
