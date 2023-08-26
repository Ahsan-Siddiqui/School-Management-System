import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import DisplayFormattedDate from '../../../ui/dateFormat';
import axios from 'axios';
import PdfGenerator from '../../../ui/PdfGenerator/pdfGenerator'; 
import PdfTemplate from '../../../ui/PdfGenerator/PdfTemplate';
const StudentProfile = () => {
    const getUser = localStorage.getItem("userData");
    const user = JSON.parse(getUser);
    const authToken = user.saveToken;
    const [studentList, setStudentList] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/studentForm/${user.userDetail.id}`, {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          setStudentList(response.data);
        })
        .catch(error => console.error('Error fetching student profile:', error));
    }, [authToken]);
    
    // Assuming the student data is the first item in the studentList array
    const studentData = studentList.length > 0 ? studentList[0] : {};
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Student Profile
        </Typography>
        <Paper elevation={5} sx={{ p: 3,marginBottom:4}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Avatar
                alt="Student Profile Picture"
                src={studentData.profilePic} // Assuming the image URL is in profilePic
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">First Name: {studentData.firstname}</Typography>
              <Typography variant="subtitle1">Gender: {studentData.gender}</Typography>
              <Typography variant="subtitle1">Contact Number: {studentData.contactNo}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Last Name: {studentData.lastname}</Typography>
              <Typography variant="subtitle1">Date of Birth:</Typography>
              <DisplayFormattedDate dateString={studentData.dob}>{studentData.dob}</DisplayFormattedDate>
            </Grid>
         
            <Grid item xs={12}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography>{studentData.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Address:</Typography>
              <Typography>{studentData.address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Parent/Guardian Info:</Typography>
              <Typography>{studentData.parntGardInfo}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Parent/Guardian Name:</Typography>
              <Typography>{studentData.parntGardName}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Relation: {studentData.relation}</Typography>
              
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Parent/Guardian Number: {studentData.parntGardNumber}</Typography>
            
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Parent/Guardian Email:</Typography>
              <Typography>{studentData.parntGardEmail}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Parent/Guardian Address:</Typography>
              <Typography>{studentData.parntGardAddress}</Typography>
            </Grid>
          </Grid>
        <PdfGenerator data={studentData} filename="student_profile" template={PdfTemplate} />
        </Paper>


      </Container>
    );
};

export default StudentProfile;
