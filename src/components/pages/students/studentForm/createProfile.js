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
  Typography,Snackbar, Slide 
} from "@mui/material";
import Alert from "@mui/material/Alert";
const StudentForm = () => {
  const history = useHistory();
  const getUser = localStorage.getItem("userData");
  const users = JSON.parse(getUser);
  const authToken = users.saveToken;
  const [profileId, setProfileId] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [studenDetail, setStudentDetail] = useState();
    // State variables for toast notifications
    const [toastOpen, setToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("success");
    const [toastMessage, setToastMessage] = useState("");
    const handleToastClose = () => {setToastOpen(false)};
    const SlideTransition = (props) => { return <Slide {...props} direction="down" />};
    // State variables for toast notifications

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    contactNo: "",
    email: "",
    address: "",
    parntGardInfo: "",
    parntGardName: "",
    relation: "",
    parntGardNumber: "",
    parntGardEmail: "",
    parntGardAddress: "",
    profilePic: null,
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/studentForm/${profileId}`, {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          // Update the StudentList state with response data
          setProfileId(response.data[0]._id);
          setUserFirstName(response.data[0].firstname)
          setUserLastName(response.data[0].lastname)
          setStudentDetail(response.data)
        }
      })
      .catch ((error) => {
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
       )
          // .catch((error) => console.error("Error fetching class list:", error));
  }, [authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (studenDetail && Array.isArray(studenDetail)) {
      const updatedStudentDetail = [...studenDetail];
      updatedStudentDetail[0][name] = value;
      setStudentDetail(updatedStudentDetail);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };
  const updateStudentProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/studentForm/${profileId}`,
        studenDetail[0],
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
  const StudentAssign = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/studentForm`,
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

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        {profileId ? "Update Profile" : "Create Profile"}
      </Typography>
      <Paper elevation={5} sx={{ p: 3 }}>
        <form onSubmit={profileId ? updateStudentProfile : StudentAssign}>
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
            Student Detail
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
                  value={userFirstName ? userFirstName : user.firstname}
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
                  value={userLastName ? userLastName : user.lastname}
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
                  value={user.dob}
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
                  value={studenDetail ? studenDetail[0].gender : user.gender}
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
                  Enter Student Personal Number
                </InputLabel>
                <Input
                  type="number"
                  name="contactNo"
                  id="contactNo"
                  value={studenDetail ? studenDetail[0].contactNo : user.contactNo}
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
                  value={studenDetail ? studenDetail[0].email : user.email}

                  // value={user.email}
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
                  value={studenDetail ? studenDetail[0].address : user.address}
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
            Guardian Detail
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="parntGardName">
                  Enter Parent / Guardian Name (required)
                </InputLabel>
                <Input
                  type="text"
                  name="parntGardName"
                  id="parntGardName"
                  value={studenDetail ? studenDetail[0].parntGardName : user.parntGardName}
                  onChange={handleChange}
                  placeholder="Parent / Guardian Name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="relation">Enter Relation</InputLabel>
                <Input
                  type="text"
                  name="relation"
                  id="relation"
                  value={studenDetail ? studenDetail[0].relation : user.relation}
                  onChange={handleChange}
                  placeholder="Relation with Parent / Guardian"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="standard" sx={{ marginTop: 0.8 }}>
                <InputLabel htmlFor="parntGardNumber">
                  Enter Parent / Guardian Contact Number
                </InputLabel>
                <Input
                  type="number"
                  name="parntGardNumber"
                  id="parntGardNumber"
                  value={studenDetail ? studenDetail[0].parntGardNumber : user.parntGardNumber}
                  onChange={handleChange}
                  placeholder="Parent / Guardian Contact Number"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="parntGardInfo">
                  Enter Parent / Guardian Info
                </InputLabel>
                <Input
                  type="text"
                  name="parntGardInfo"
                  id="parntGardInfo"
                  value={studenDetail ? studenDetail[0].parntGardInfo : user.parntGardInfo}
                  onChange={handleChange}
                  placeholder="Enter Student Parent / Guardian Info"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="standard" sx={{ marginTop: 0.8 }}>
                <InputLabel htmlFor="parntGardEmail">
                  Enter Parent / Guardian Email
                </InputLabel>
                <Input
                  type="email"
                  name="parntGardEmail"
                  id="parntGardEmail"
                  value={studenDetail ? studenDetail[0].parntGardEmail : user.parntGardEmail}
                  onChange={handleChange}
                  placeholder="Enter Student Parent / Guardian Email"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ marginBottom: 1 }}
              >
                <InputLabel htmlFor="parntGardAddress">
                  Enter Parent / Guardian Address
                </InputLabel>
                <Input
                  type="text"
                  name="parntGardAddress"
                  id="parntGardAddress"
                  value={studenDetail ? studenDetail[0].parntGardAddress : user.parntGardAddress}
                  onChange={handleChange}
                  placeholder="Enter Student Parent / Guardian Address"
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

    //       <h3
    //         style={{
    //           textAlign: "left",
    //           fontWeight: "bold",
    //           backgroundColor: "#333",
    //           color: "white",
    //           padding: 10,
    //           fontFamily: "serif",
    //         }}
    //       >
    //         Class Detail
    //       </h3>
    //       <div className="row">
    //         <div className="input-control col-md-4">
    //           <label htmlFor="classGrade">Enter Student Class (required)</label>
    //           <input
    //             type="classGrade"
    //             name="classGrade"
    //             value={user.classGrade}
    //             onChange={handleChange}
    //             placeholder="Enter class / Grade"
    //           />
    //         </div>
    //         <div className="input-control col-md-4">
    //           <label htmlFor="section">Enter Section (required)</label>
    //           <select
    //             name="section"
    //             value={user.section}
    //             onChange={handleChange}
    //             className="custom-select"
    //             placeholder="Enter class section"
    //           >
    //             <option value="" name="">
    //               Select Option
    //             </option>
    //             <option value="Section-A" name="Section-A">
    //               Section-A
    //             </option>
    //             <option value="Section-B" name="Section-B">
    //               Section-B
    //             </option>
    //             <option value="Section-C" name="Section-C">
    //               Section-C
    //             </option>
    //           </select>
    //         </div>
    //         <div className="input-control col-md-4">
    //           <label htmlFor="rollNo">Student Roll Number (required)</label>
    //           <input
    //             type="rollNo"
    //             name="rollNo"
    //             value={user.rollNo}
    //             onChange={handleChange}
    //             placeholder="Enter Roll number"
    //           />
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="input-control col-md-4">
    //           <label htmlFor="enrollDate">
    //             Enter Student Enroll Date (required)
    //           </label>
    //           <input
    //             type="date"
    //             name="enrollDate"
    //             value={user.enrollDate}
    //             onChange={handleChange}
    //             placeholder="Enter Enroll Date"
    //           />
    //         </div>
    //         <div className="input-control col-md-4">
    //           <label htmlFor="addmissionNumber">
    //             Enter Student Admission Number
    //           </label>
    //           <input
    //             type="addmissionNumber"
    //             name="addmissionNumber"
    //             value={user.addmissionNumber}
    //             onChange={handleChange}
    //             placeholder="Enter Admission Number"
    //           />
    //         </div>
    //         <div className="input-control col-md-4">
    //           <label htmlFor="emergancyContact">
    //             Enter Emergency Contact Number (required)
    //           </label>
    //           <input
    //             type="number"
    //             name="emergancyContact"
    //             value={user.emergancyContact}
    //             onChange={handleChange}
    //             placeholder="Emergency Contact"
    //           />
    //         </div>
    //       </div>
    //       <div className="input-control">
    //         <label htmlFor="profilePic">Enter Profile Picture</label>
    //         <input
    //           type="file"
    //           name="profilePic"
    //           onChange={(e) =>
    //             setUser({ ...user, profilePic: e.target.files[0] })
    //           } // Handle file selection
    //           placeholder="Upload Profile Picture"
    //         />
    //       </div>

    //       <div className="input-control add-expense-btn">
    //         <Button type="submit">Create New Student</Button>
    //       </div>
    //     </form>
    //   </Card>
    // </div>
  );
};

export default StudentForm;
