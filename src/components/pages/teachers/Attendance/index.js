import React, { useState } from "react";
import { Button, Grid, Container } from "@mui/material";
import StudentAttendanceForm from "./Form/SAttendanceForm";
import StudentAttendanceList from "./List/SAttendanceList";

const Attendance = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <Container>
      <Grid container justifyContent="flex-end" onClick={toggleForm}>
        <Button type="submit" variant="contained" color="primary">
          {showForm ? "Back to List" : "Take Attendance"}
        </Button>
      </Grid>
      {showForm ? <StudentAttendanceForm /> : <StudentAttendanceList />}
    </Container>
  );
};

export default Attendance;
