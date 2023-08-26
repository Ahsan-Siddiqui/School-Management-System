import React, { useState } from "react";
import { Button, Grid, Container } from "@mui/material";
import AssignTeacherClass from "./Form";
import TeacherList from "./List";

const AssignTeachers = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <Container>
      <Grid container justifyContent="flex-end" onClick={toggleForm}>
        <Button type="submit" variant="contained" color="primary">
          {showForm ? "Back to List" : "Assign Teacher To Class"}
        </Button>
      </Grid>
      {showForm ? <AssignTeacherClass /> : <TeacherList />}
    </Container>
  );
};

export default AssignTeachers;
