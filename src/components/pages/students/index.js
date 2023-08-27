import React,{useState,useEffect} from 'react';
import { Container, Card, CardHeader, Avatar, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import axios from 'axios';
const StudentDashboard = () => {
  const getUser = localStorage.getItem("userData");
  const user = JSON.parse(getUser);
  const authToken = user.saveToken;
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/studentForm/${user.userDetail.id}`, {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response.data);
      setTeacher(response.data);
    })
    .catch(error => console.error('Error fetching teacher details:', error));
    axios.get('ttp://localhost:8080/api/assignments/', {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('assignments',response.data);
      setTeacher(response.data);
    })
    .catch(error => console.error('Error fetching teacher details:', error));
  }, [authToken, user.userDetail.id]);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {teacher.map((item, index) => (
      <Grid container spacing={2}  key={index}>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
          <Card sx={{ height: 150 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[800], width: 120, height: 120 }} aria-label="recipe">
                   <span style={{ fontWeight: 'bold', fontSize: '3em' }}>{item.firstname[0]}</span>
                  </Avatar>
                }
                
                title={
                  <Typography variant="h6">
                    <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Welcome</span> {item.firstname}
                  </Typography>
                }
                subheader="Student" 
              />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: 150 }}>
              {/* Card content */}
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: 150 }}>
              {/* Card content */}
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: 70 }}>
              {/* Card content */}
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: 405, position: 'relative', zIndex: 1 }}>
            {/* Card content */}
          </Card>
        </Grid>
      
      </Grid>
       ))}
    </Container>
  );
};

export default StudentDashboard;
