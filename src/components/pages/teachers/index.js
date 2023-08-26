import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardContent, Button 
} from "@mui/material";



import { blue, red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import axios from "axios";
const TeacherDashboard = () => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;
  const [teacher, setTeacher] = useState([]);
  const [teacherTimeTable, setTeacherTimeTable] = useState([]);
  useEffect(() => {
    // Get Teacher Dashboard Detail
    axios
      .get(`http://localhost:8080/api/teacherForm/${user.userDetail.id}`, {
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTeacher(response.data);
      })
      .catch((error) =>
        console.error("Error fetching teacher details:", error)
      );
     //Get Teacher Time Table
     axios
     .get(`http://localhost:8080/api/getTimetableDetails/teacher/${user.userDetail.id}`, {
       headers: {
         Authorization: authToken,
         "Content-Type": "application/json",
       },
     })
     .then((response) => {
       setTeacherTimeTable(response.data);
     })
     .catch((error) =>
       console.error("Error fetching teacher time table:", error)
     );
  }, [authToken, user.userDetail.id]);

  const useStyles =  () => ({
    card: {
      maxWidth: 400,
      margin: '0 auto',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

  
  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
            {teacher.map((item) => (
              <Card sx={{ height: 150 }} key={item._id}>
                {" "}
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: blue[800], width: 120, height: 120 }}
                      aria-label="recipe"
                    >
                      <span style={{ fontWeight: "bold", fontSize: "3em" }}>
                        {item.firstname[0]}
                      </span>
                    </Avatar>
                  }
                  title={
                    <Typography variant="h6">
                      <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                        Welcome
                      </span>{" "}
                      {item.firstname}
                    </Typography>
                  }
                  subheader="Teacher"
                />
              </Card>
            ))}
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ height: 200 }}>
            <CardContent >
        <Typography variant="h6" gutterBottom>
          Today's Quiz
        </Typography>
        <Typography variant="body1" paragraph>
          Test your knowledge with our daily quiz!
        </Typography>
        <Typography variant="body2" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non aliquet ipsum.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{float:'right'}}
        >
          Start Quiz
        </Button>
      </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: 150 }}>
            <CardContent >
        <Typography variant="h6" gutterBottom>
          Attendance Sheet
        </Typography>
        <Typography variant="body1" paragraph>
          {"Class 01"}
        </Typography>
        <Typography variant="body2" paragraph>
          {"Class 02"}
        </Typography>
       
      </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: 70 }}>{/* Card content */}</Card>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          
          <Card sx={{ height: 405, position: "relative", zIndex: 1 }}>
          <Typography variant="h6" gutterBottom sx={{textAlign:'center',fontSize:24,padding:2,fontWeight:'bold'}}>
          Time Table
        </Typography>
          {teacherTimeTable.length === 0 ? (
            <CardContent>
        <Typography variant="body1" sx={{fontWeight:'bold',justifyContent:'center',textAlign:'center'}}>
          You have no classes assigned yet.
        </Typography>
      </CardContent>

          )
        :
        <TableContainer component={Paper}>
        <Table>
       
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              {/* <TableCell>Teacher</TableCell> */}
              <TableCell>Subject</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Days</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {teacherTimeTable.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell
                >
                  {item.gradeName.name}
                </TableCell>
                {/* <TableCell>{item.teacherAssign.name}</TableCell> */}
                <TableCell>{item.selectSubject}</TableCell>
                <TableCell>{item.selectedTimeSlot}</TableCell>
                <TableCell>{teacherTimeTable[index]?.selectedDays.join(", ")}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        }
           
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;
