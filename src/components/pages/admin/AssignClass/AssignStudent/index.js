import React, { useState } from "react";
import { Button, Grid, Container } from "@mui/material";
import AssignStudentClass from "./Form";
import StudentList from "./List";

const AssignStudents = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <Container>
      <Grid container justifyContent="flex-end" onClick={toggleForm}>
        <Button type="submit" variant="contained" color="primary">
          {showForm ? "Back to List" : "Assign Student To Class"}
        </Button>
      </Grid>
      {showForm ? <AssignStudentClass /> : <StudentList />}
    </Container>
  );
};

export default AssignStudents;
