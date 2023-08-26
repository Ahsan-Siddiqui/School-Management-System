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
const TeacherProfile = () => {
    const getUser = localStorage.getItem("userData");
    const user = JSON.parse(getUser);
    const authToken = user.saveToken;
    const [teacher, setTeacher] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/teacherForm/$${user.userDetail.id}`, {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          setTeacher(response.data);
        })
        .catch(error => console.error('Error fetching student profile:', error));
    }, [authToken]);
    
    // Assuming the student data is the first item in the teacher array
    const teacherData = teacher.length > 0 ? teacher[0] : {};
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
        Profile
        </Typography>
        <Paper elevation={5} sx={{ p: 3,marginBottom:4}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Avatar
                alt="Student Profile Picture"
                src={teacherData.profilePic} // Assuming the image URL is in profilePic
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">First Name: {teacherData.firstname}</Typography>
              <Typography variant="subtitle1">Gender: {teacherData.gender}</Typography>
              <Typography variant="subtitle1">Contact Number: {teacherData.contactNo}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Last Name: {teacherData.lastname}</Typography>
              <Typography variant="subtitle1">Date of Birth:</Typography>
              <DisplayFormattedDate dateString={teacherData.dob}>{teacherData.dob}</DisplayFormattedDate>
            </Grid>
         
            <Grid item xs={12}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography>{teacherData.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Address:</Typography>
              <Typography>{teacherData.address}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Parent/Guardian Info:</Typography>
              <Typography>{teacherData.parntGardInfo}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Parent/Guardian Name:</Typography>
              <Typography>{teacherData.parntGardName}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Relation: {teacherData.relation}</Typography>
              
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Parent/Guardian Number: {teacherData.parntGardNumber}</Typography>
            
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1">Parent/Guardian Email:</Typography>
              <Typography>{teacherData.parntGardEmail}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Parent/Guardian Address:</Typography>
              <Typography>{teacherData.parntGardAddress}</Typography>
            </Grid>
          </Grid>
        <PdfGenerator data={teacherData} filename="student_profile" template={PdfTemplate} />
        </Paper>


      </Container>
    );
};

export default TeacherProfile;
